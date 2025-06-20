import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      const uri = process.env.MONGO_URI;
      console.log("Trying to connect to MongoDB with URI:", uri);
  
      if (!uri) {
        throw new Error("MONGO_URI is not defined");
      }
  
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error.message);
      process.exit(1);
    }
  };
  