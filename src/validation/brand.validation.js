import { check, body } from "express-validator";
import validator from "../middlewares/validation.js";
import slugify from "slugify";

// import joi from "joi";

// export const createBrandSchema = joi.object({
//   name: joi.string().required().trim().min(3).max(20),
// });

// export const getBrandByIdSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });
// export const updateBranddSchema = joi.object({
//   name: joi.string().trim().min(3).max(20),
//   id: joi.string().hex().length(24).required(),
// });
// export const deleteBranddSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });

export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validator,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validator,
];
