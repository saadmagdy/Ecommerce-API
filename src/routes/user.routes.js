import express from "express";
import * as userCtrl from "../controllers/userCtrl.js";
import {
  deleteUserValidator,
  getUserByIdValidator,
  logInValidator,
  signUpValidator,
  updateUserValidator,
} from "../validation/user.validation.js";
import uploadSingleFile from "../utils/file.upload.js";
uploadSingleFile();
const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(
    uploadSingleFile("user", "profilePic"),
    signUpValidator,
    userCtrl.signUp
  );
userRouter.route("/login").post(logInValidator, userCtrl.logIn);
userRouter.route("/").get(userCtrl.getAllUsers);
userRouter
  .route("/:id")
  .get(getUserByIdValidator, userCtrl.getUserById)
  .put(
    uploadSingleFile("user", "profilePic"),
    updateUserValidator,
    userCtrl.updateUser
  )
  .delete(deleteUserValidator, userCtrl.deleteUser);

export default userRouter;
