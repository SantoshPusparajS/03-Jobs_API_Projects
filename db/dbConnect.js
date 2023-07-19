import mongoose from "mongoose";

const dbConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
