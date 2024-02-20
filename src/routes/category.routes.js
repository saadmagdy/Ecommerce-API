import express from "express";
import * as categoryCtrl from "../controllers/ctegoryCtrl.js";
import subCategoryRouter from "./subCategory.routes.js";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from "../validation/category.validation.js";
import uploadSingleFile from "../utils/file.upload.js";
import { allowedTo, auth } from "../middlewares/Auth.js";

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategory", subCategoryRouter);

categoryRouter
  .route("/")
  .post(
    uploadSingleFile("category", "image"),
    auth,
    allowedTo("admin"),
    categoryCtrl.setImageTBody,
    createCategoryValidator,
    categoryCtrl.createCategory
  )
  .get(categoryCtrl.getAllCategories);

categoryRouter
  .route("/:id")
  .get(getCategoryValidator, categoryCtrl.getCategoryById)
  .put(
    uploadSingleFile("category", "image"),
    auth,
    allowedTo("admin"),
    updateCategoryValidator,
    categoryCtrl.updateCategory
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteCategoryValidator,
    categoryCtrl.deleteCategory
  );

export default categoryRouter;
