import express from "express";
import categoryRouter from "./category.routes.js";
import subCategoryRouter from "./subCategory.routes.js";
import brandRouter from "./brand.routes.js";
import productRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import reviewRouter from "./review.routes.js";
import cartRouter from "./cart.routes.js";
import couponRouter from "./coupon.routes.js";
import orderRouter from "./order.routes.js";
import whishListRouter from "./whishList.routes.js";
import addressesRouter from "./addresses.routes.js";
const app = express();
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/brand", brandRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/coupon", couponRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/wishlist", whishListRouter);
app.use("/addresses", addressesRouter);


export default app;
