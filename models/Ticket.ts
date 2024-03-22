import mongoose from "mongoose";
import DepartmentModel from "./Department";
import UserModel from "./User";
import SubDepartmentModel from "./SubDepartment";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isItAnswer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
