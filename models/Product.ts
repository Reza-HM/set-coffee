import mongoose, { Schema, Types } from "mongoose";
import commentSchema from "./Comment";

export interface IProduct {
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  weight: number;
  suitableFor: string;
  smell: string;
  score: number;
  tags: string[];
  comments: Types.ObjectId[];
}

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const ProductModel =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
