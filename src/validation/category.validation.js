import { check, body } from "express-validator";
import validator from "../middlewares/validation.js";
// import joi from "joi";

// export const createCategorySchema = joi.object({
//   name: joi.string().required().trim().min(3).max(20),
// });

// export const getCategoryByIdSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });
// export const updateCategorydSchema = joi.object({
//   name: joi.string().trim().min(3).max(20),
//   id: joi.string().hex().length(24).required(),
// });
// export const deleteCategorydSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validator,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validator,
];
