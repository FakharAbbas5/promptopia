import mongoose from "mongoose";

let isConnected = false;

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) return console.log("MongoDB already connected!");

  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "share_prompt",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    isConnected = true;
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log(err);
  }
};
