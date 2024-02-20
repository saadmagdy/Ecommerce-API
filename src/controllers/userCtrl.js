import User from "../models/User.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as factory from "./factoryHandler.js";

// @desc     signUp new user
// route     POST /user/signup
// @access   public
export const signUp = asyncHandler(async (req, res, next) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return apiError.create("Email Already Exists", 400);
  if (req.file) req.body.profilePic = req.file.filename;
  const newUser = await User.create(req.body);
  if (newUser) {
    return res.status(201).json({ message: "Account created successfully" });
  } else {
    return apiError.create(
      "Something went wrong while creating an account.",
      400
    );
  }
});

// @desc     login user
// route     POST /user/login
// @access   public

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist || !(await userExist.checkPassword(password)))
    return apiError.create("Invalid Data", 401);
  userExist.generateToken(res);
  return res
    .status(201)
    .json({ id: userExist._id, name: userExist.name, email: userExist.email });
});

// @desc    Get list of users
// @route   GET /user/
// @access  Private/Admin

export const getAllUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /user/:id
// @access  Private/Admin
export const getUserById = factory.getOne(User);
// @desc    Update specific user
// @route   PUT /user/:id
// @access  Private/Admin
export const updateUser = factory.updateOne(User);
// @desc    Delete specific user
// @route   DELETE /user/:id
// @access  Private/Admin
export const deleteUser = factory.deleteOne(User);
