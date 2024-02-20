import asyncHandler from "../utils/asyncHandler.js";
import Brand from "./../models/Brand.js";
import * as factory from "./factoryHandler.js";

export const setLogoToBody = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.logo = req.file.filename;
    return next();
  }
  return next();
});

// @desc     Create new Brand
// route     POST /brand
// @access   Private
export const createBrand = factory.createOne(Brand);

//   asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   req.body.logo = req.file.filename;
//   let brand = new Brand(req.body);
//   if (!brand) return next(apiError.create("No brand to save"));
//   await brand.save();
//   return res.status(201).json({ message: "Success", brand });
// });

// @desc     Get all Brands
// route     GET /brand
// @access   Private
export const getAllBrands = factory.getAll(Brand);

//   asyncHandler(async (req, res, next) => {
//   let apiFeature = new ApiFeatures(Brand.find(), req.query)
//     .paginate()
//     .fields()
//     .sort()
//     .search()
//     .filter();
//   const brands = await apiFeature.mongooseQuery;
//   if (!brands.length) return next(apiError.create("No brands to show", 404));
//   return res.status(200).json({ message: "Success!", brands });
// });

// @desc     Get Brand by id
// route     GET /brand/:id
// @access   Private
export const getBrandById = factory.getOne(Brand);

//   asyncHandler(async (req, res, next) => {
//   const brand = await Brand.findById(req.params.id);
//   if (!brand) {
//     return next(apiError.create("No brand found with that ID", 404));
//   } else return res.status(200).json({ message: "Success!", brand });
// });
// @desc     Update Brand by id
// route     PUT /brand/:id
// @access   Private
export const updateBrand = factory.updateOne(Brand);

//   asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   req.body.logo = req.file.filename;
//   const { id } = req.params;
//   let brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
//   if (!brand) return next(apiError.create("No brand to update"));
//   return res.status(200).json({ message: "Success!", brand });
// });
// @desc     Delete Brand by id
// route     DELETE /brand/:id
// @access   Private
export const deleteBrand = factory.deleteOne(Brand);

//   asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   let brand = await Brand.findById(id);
//   if (!brand) {
//     return next(apiError.create("No brand Found With That Id", 404));
//   }
//   await brand.remove({ _id: id });
//   return res.status(200).json({ message: "Deleted Successfully!" });
// });
