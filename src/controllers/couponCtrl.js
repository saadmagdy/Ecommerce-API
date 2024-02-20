import Coupon from "../models/Coupon.js";
import * as factory from "./factoryHandler.js";

// @desc    Get list of coupons
// @route   GET coupons
// @access  Private/Admin
export const getCoupons = factory.getAll(Coupon);

// @desc    Get specific coupon by id
// @route   GET coupons/:id
// @access  Private/Admin
export const getCoupon = factory.getOne(Coupon);

// @desc    Create coupon
// @route   POST  coupons
// @access  Private/Admin
export const createCoupon = factory.createOne(Coupon);

// @desc    Update specific coupon
// @route   PUT coupons/:id
// @access  Private/Admin
export const updateCoupon = factory.updateOne(Coupon);

// @desc    Delete specific coupon
// @route   DELETE coupons/:id
// @access  Private/Admin
export const deleteCoupon = factory.deleteOne(Coupon);
