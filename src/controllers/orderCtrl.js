import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as factory from "./factoryHandler.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);
// @desc    create cash order
// @route   POST /order/cartId
// @access  Protected/User
export const createCashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      apiError.create(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create order with default paymentMethodType cash
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  return res.status(201).json({ status: "success", data: order });
});

export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  return next();
});

// @desc    Get all orders
// @route   GET /order
// @access  Protected/User-Admin
export const findAllOrders = factory.getAll(Order);

// @desc    Get one order
// @route   GET /order/:orderid
// @access  Protected/User-Admin
export const findSpecificOrder = factory.getOne(Order);

// @desc    Update order paid status to paid
// @route   PUT /order/:id/pay
// @access  Protected/Admin
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      apiError.create(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  return res.status(200).json({ status: "success", data: updatedOrder });
});

// @desc    Update order delivered status
// @route   PUT /order/:id/deliver
// @access  Protected/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      apiError.create(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  return res.status(200).json({ status: "success", data: updatedOrder });
});

// @desc    Get checkout session from stripe and send it as response
// @route   GET /order/checkout-session/cartId
// @access  Protected/User
export const checkoutSession = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      apiError.create(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        name: req.user.name,
        amount: totalOrderPrice * 100,
        currency: "egp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  // 4) send session to response
  return res.status(200).json({ status: "success", session });
});

const createCardOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const oderPrice = session.amount_total / 100;

  const cart = await Cart.findById(cartId);
  const user = await User.findOne({ email: session.customer_email });

  // 3) Create order with default paymentMethodType card
  const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: oderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: "card",
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(cartId);
  }
};

// @desc    This webhook will run when stripe payment success paid
// @route   POST /webhook-checkout
// @access  Protected/User
export const webhookCheckout = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    //  Create order
    createCardOrder(event.data.object);
  }

  return res.status(200).json({ received: true });
});
