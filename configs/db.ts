import mongoose from "mongoose";

const connectToDB = async (): Promise<boolean> => {
  try {
    if (mongoose.connections[0]?.readyState === 1) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("MongoDB is Connected!");
    }
  } catch (err) {
    console.error("DB Connection Has Error:", err);
  }
  return false;
};

export default connectToDB;
