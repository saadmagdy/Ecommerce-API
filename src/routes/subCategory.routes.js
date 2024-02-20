import express from "express";
import * as subCategoryCtrl from "../controllers/subCategoryCtrl.js";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../validation/subCategory.validation.js";
import { allowedTo, auth } from "../middlewares/Auth.js";
const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(
    auth,
    allowedTo("admin"),
    subCategoryCtrl.setCategoryToBody,
    createSubCategoryValidator,
    subCategoryCtrl.createSubCategory
  )
  .get(subCategoryCtrl.createFilterObj, subCategoryCtrl.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .get(getSubCategoryValidator, subCategoryCtrl.getSubCategoryById)
  .put(
    auth,
    allowedTo("admin"),
    updateSubCategoryValidator,
    subCategoryCtrl.updateSubCategory
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    subCategoryCtrl.deleteSubCategory
  );

export default subCategoryRouter;
