import mongoose, { Document, Schema, Model } from "mongoose";
import productSchema from "./Product";
import userSchema from "./User";

export interface IComment {
  username: string;
  body: string;
  email: string;
  score: number;
  isAccept: boolean;
  date: Date;
  productID: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema({
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
  isAccept: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const CommentModel =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;
