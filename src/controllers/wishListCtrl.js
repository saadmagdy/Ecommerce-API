import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Add product to wishlist
// @route   POST /wishlist
// @access  Private/User

export const addProductToWishlist = asyncHandler(async (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );

  return res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist.",
    data: user.wishlist,
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /wishlist/:productId
// @access  Private/User
export const removeProductFromWishlist = asyncHandler(
  async (req, res, next) => {
    // $pull => remove productId from wishlist array if productId exist
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.productId },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Product removed successfully from your wishlist.",
      data: user.wishlist,
    });
  }
);

// @desc    Get logged user wishlist
// @route   GET /wishlist
// @access  Private/User

export const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  return res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
