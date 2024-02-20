import User from "./../models/User.js";
import asyncHandler from "./../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";

export const auth = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) return next(apiError.create("No Token", 401));

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  let user = await User.findById(id).select("-password");
  if (!user) return next(apiError.create("Invalid Token", 500));
  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(apiError.create("Not Allowed", 403));
    } else {
      next();
    }
  });
};
