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
  } catch (error: any) {
    console.log("Failed to connect to MongoDB.", error);
    // Use the exit code 1 to indicate that the program ended with an error
    process.exit(1);
  }
};

export default connectDB;