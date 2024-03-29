import mongoose, { Schema } from "mongoose";
import UserModel from "./User";
import ProductModel from "./Product";

const wishlistSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const wishlistModel =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export default wishlistModel;
