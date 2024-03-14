import mongoose, { Document, Schema, Model } from "mongoose";
import { ProductDocument } from "./Product";

export interface Comment {
  username: string;
  body: string;
  email: string;
  score: number;
  date: Date;
  product: mongoose.Types.ObjectId | ProductDocument;
}

export interface CommentDocument extends Comment, Document {}

export interface CommentModel extends Model<CommentDocument> {}

const commentSchema: Schema<CommentDocument> = new Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: false,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const CommentModel: CommentModel =
  mongoose.models.Comment ||
  mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
