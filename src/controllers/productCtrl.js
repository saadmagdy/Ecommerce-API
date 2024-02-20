import asyncHandler from "../utils/asyncHandler.js";
import Product from "./../models/Product.js";
import * as factory from "./factoryHandler.js";

export const setCoverImageToBody = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    req.body.imageCover = req.files.imageCover[0].filename;
    return next();
  }
  return next();
});
export const setImagesToBody = asyncHandler(async (req, res, next) => {
  if (req.files.images.length > 0) {
    req.body.images = [];
    req.body.images.push(req.files.images.filename);
    return next();
  }
  return next();
});

// @desc     Create new Product
// route     POST /product
// @access   Private
export const createProduct = factory.createOne(Product);

//   asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.title);
//   let product = new Product(req.body);
//   if (!product) return next(apiError.create("No product to save"));
//   await product.save();
//   return res.status(201).json({ message: "Success", product });
// });

// @desc     Get all Products
// route     GET /product
// @access   Private
export const getAllProducts = factory.getAll(Product, "Products");

// asyncHandler(async (req, res, next) => {
// let apiFeature = new ApiFeatures(Product.find(), req.query)
//   .paginate()
//   .fields()
//   .sort()
//   .search()
//   .filter();
// const products = await apiFeature.mongooseQuery;
// if (!products.length)
//   return next(apiError.create("No products to show", 404));
// return res
//   .status(200)
//   .json({ message: "Success!", page: apiFeature.page, products });
// });

// @desc     Get Product by id
// route     GET /product/:id
// @access   Private
export const getProductById = factory.getOne(Product);

//   asyncHandler(async (req, res, next) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     return next(apiError.create("No product found with that ID", 404));
//   } else return res.status(200).json({ message: "Success!", product });
// });
// @desc     Update Product by id
// route     PUT /product/:id
// @access   Private
export const updateProduct = factory.updateOne(Product);

//   asyncHandler(async (req, res, next) => {
//   let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   if (!product) return next(apiError.create("No product to update"));
//   return res.status(200).json({ message: "Success!", product });
// });
// @desc     Delete Product by id
// route     DELETE /product/:id
// @access   Private
export const deleteProduct = factory.deleteOne(Product);

//   asyncHandler(async (req, res, next) => {
// const { id } = req.params;
//   let product = await Product.findById(id);
//   if (!product) {
//     return next(apiError.create("No product Found With That Id", 404));
//   }
//   await product.remove({ _id: id });
//   return res.status(200).json({ message: "Deleted Successfully!" });
// });
