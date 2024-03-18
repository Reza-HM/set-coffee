import mongoose, { Schema } from "mongoose";

export interface IContact {
  email: string;
  name: string;
  company?: string;
  phone: string;
  message: string;
}

const schema: Schema<IContact> = new Schema({
  email: {
    type: String,
    required: true,
    // pattern: /email/g,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const model =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", schema);

export default model;
