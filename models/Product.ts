import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { CommentDocument } from "./Comment";

export interface Product {
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  weight: number;
  suitableFor: string;
  smell: string;
  score: number;
  tags: string[];
  comments: Types.ObjectId[] | CommentDocument[];
}

export interface ProductDocument extends Product, Document {}

export interface ProductModel extends Model<ProductDocument> {}

const productSchema: Schema<ProductDocument> = new Schema({
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

const ProductModel: ProductModel =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
