import { check, body } from "express-validator";
import validator from "../middlewares/validation.js";
import slugify from "slugify";

// import joi from "joi";

// export const createSubCategorySchema = joi.object({
//   name: joi.string().required().trim().min(3).max(20),
//   category: joi.string().hex().length(24).required(),
// });

// export const getSubCategoryByIdSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });
// export const updateSubCategorydSchema = joi.object({
//   name: joi.string().trim().min(3).max(20),
//   category: joi.string().hex().length(24),
//   id: joi.string().hex().length(24).required(),
// });
// export const deleteSubCategorydSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validator,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validator,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validator,
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validator,
];
