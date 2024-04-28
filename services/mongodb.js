import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    return connection;
  } catch (error) {
    console.error(error);
  }
};
