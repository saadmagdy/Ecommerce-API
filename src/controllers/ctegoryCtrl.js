import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as factory from "./factoryHandler.js";

export const setImageTBody = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
    return next();
  }
  return next();
});

// @desc     Create new Category
// route     POST /category
// @access   Private
export const createCategory = factory.createOne(Category);

//   asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   req.body.image = req.file.filename;
//   let category = new Category(req.body);
//   if (!category) return next(apiError.create("No Category to save"));
//   await category.save();
//   return res.status(201).json({ message: "Success", category });
// });

// @desc     Get all Categories
// route     GET /category
// @access   Public
export const getAllCategories = factory.getAll(Category);

// asyncHandler(async (req, res, next) => {
// let apiFeature = new ApiFeatures(Category.find(), req.query)
//   .paginate()
//   .fields()
//   .sort()
//   .search()
//   .filter();
// const categories = await apiFeature.mongooseQuery;
// if (!categories.length)
//   return next(apiError.create("No Categories to show", 404));
// return res.status(200).json({ message: "Success!", categories });
// });

// @desc     Get Category by id
// route     GET /category/:id
// @access   Public
export const getCategoryById = factory.getOne(Category);

//   asyncHandler(async (req, res, next) => {
//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     return next(apiError.create("No Category found with that ID", 404));
//   } else return res.status(200).json({ message: "Success!", category });
// });

// @desc     Update Category by id
// route     PUT /category/:id
// @access   Private
export const updateCategory = factory.updateOne(Category);

//   asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   req.body.image = req.file.filename;
//   const { id } = req.params;
//   let category = await Category.findByIdAndUpdate(id, req.body, { new: true });
//   if (!category) return next(apiError.create("No Category to update"));
//   return res.status(200).json({ message: "Success!", category });
// });
// @desc     Delete Category by id
// route     DELETE /category/:id
// @access   Private
export const deleteCategory = factory.deleteOne(Category);

//   asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   let category = await Category.findById(id);
//   if (!category) {
//     return next(apiError.create("No Category Found With That Id", 404));
//   }
//   await Category.remove({ _id: id });
//   return res.status(200).json({ message: "Deleted Successfully!" });
// });
