import SubCategory from "../models/SubCategory.js";
import * as factory from "./factoryHandler.js";

// set categoryId to body
export const setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  return next();
};
// @desc     Create new SubCategory
// route     POST /subcategory
// @access   Private
export const createSubCategory = factory.createOne(SubCategory);

//   asyncHandler(async (req, res, next) => {
//   const { name, category } = req.body;
//   let subCategory = new SubCategory({ name, category, slug: slugify(name) });
//   if (!subCategory) return next(apiError.create("No subCategory to save"));
//   await subCategory.save();
//   return res.status(201).json({ message: "Success", subCategory });
// });

export const createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) {
    filterObj = { category: req.params.categoryId };
    req.filterObj = filterObj;
  }
  return next();
};

// @desc     Get all SubCategories
// route     GET /subcategory
// @access   Private
export const getAllSubCategories = factory.getAll(SubCategory);

//   asyncHandler(async (req, res, next) => {
//   let apiFeature = new ApiFeatures(SubCategory.find({}), req.query)
//     .paginate()
//     .fields()
//     .sort()
//     .search()
//     .filter();
//   let subCategory = await apiFeature.mongooseQuery;

//   subCategory = await SubCategory.find(req.filterObj);
//   if (!subCategory.length)
//     return next(apiError.create("No subCategories to show", 404));
//   return res.status(200).json({ message: "Success!", subCategory });
// });

// @desc     Get SubCategory by id
// route     GET /subcategory/:id
// @access   Private
export const getSubCategoryById = factory.getOne(SubCategory);

//   asyncHandler(async (req, res, next) => {
//   const subCategory = await SubCategory.findById(req.params.id);
//   if (!subCategory) {
//     return next(apiError.create("No subCategory found with that ID", 404));
//   } else return res.status(200).json({ message: "Success!", subCategory });
// });
// @desc     Update SubCategory by id
// route     PUT /subcategory/:id
// @access   Private
export const updateSubCategory = factory.updateOne(SubCategory);

//   asyncHandler(async (req, res, next) => {
//   const { name, category } = req.body;
//   const { id } = req.params;
//   let subCategory = await SubCategory.findByIdAndUpdate(
//     id,
//     { name, category, slug: slugify(name) },
//     { new: true }
//   );
//   if (!subCategory) return next(apiError.create("No subCategory to update"));
//   return res.status(200).json({ message: "Success!", subCategory });
// });
// @desc     Delete SubCategory by id
// route     DELETE /subcategory/:id
// @access   Private
export const deleteSubCategory = factory.deleteOne(SubCategory);

//   asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   let subCategory = await SubCategory.findById(id);
//   if (!subCategory) {
//     return next(apiError.create("No subCategory Found With That Id", 404));
//   }
//   await SubCategory.remove({ _id: id });
//   return res.status(200).json({ message: "Deleted Successfully!" });
// });
