import { check, body } from "express-validator";
import validator from "../middlewares/validation.js";
import slugify from "slugify";
import Category from "./../models/Category.js";
import SubCategory from "./../models/SubCategory.js";

// import joi from "joi";

// export const createProductSchema = joi.object({
//   title: joi.string().required().trim().min(3).max(20),
//   price: joi.number().required().min(0),
//   priceAfterDiscount: joi.number().min(0),
//   ratingAvg: joi.number().max(5).min(1),
//   ratingCount: joi.number().min(0).default(0),
//   description: joi.string().required().trim().min(5).max(300),
//   quantity: joi.number().required().min(0).default(0),
//   sold: joi.number().min(0).default(0),
//   category: joi.string().required().hex().length(24),
//   subCategory: joi.string().required().hex().length(24),
//   brand: joi.string().required().hex().length(24),
// });

// export const getProductByIdSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });
// export const updateProductdSchema = joi.object({
//   title: joi.string().trim().min(3).max(20),
//   price: joi.number().min(0),
//   priceAfterDiscount: joi.number().min(0),
//   ratingAvg: joi.number().max(5).min(1),
//   ratingCount: joi.number().min(0).default(0),
//   description: joi.string().trim().min(5).max(300),
//   quantity: joi.number().min(0).default(0),
//   sold: joi.number().min(0).default(0),
//   category: joi.string().hex().length(24),
//   subCategory: joi.string().hex().length(24),
//   brand: joi.string().hex().length(24),
//   id: joi.string().hex().length(24),
// });
// export const deleteProductdSchema = joi.object({
//   id: joi.string().hex().length(24).required(),
// });

export const createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subcategories Ids`));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),

  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validator,
];

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validator,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validator,
];
