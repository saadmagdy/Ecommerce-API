import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name required"],
      trim: true,
      minLength: [2, "Too short user name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email required"],
      unique: [true, "email must be unique"],
      minLength: 1,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number required"],
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.post("init", function (doc) {
  doc.profilePic = "http://localhost:5000/user/" + doc.profilePic;
});

// Password encryption middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});
/**
 * Helper method for checking password.
 */
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function (res) {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
