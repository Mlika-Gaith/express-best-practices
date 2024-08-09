import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI! as string, {
      dbName: process.env.MONGODB_NAME,
      appName: process.env.MONGO_APP_NAME,
      retryWrites: true,
      retryReads: true,
      w: "majority",
    });
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("Failed to connect to MongoDB.", err);
    process.exit(1);
  }
};

export default connectDB;
