// require("dotenv").config({ path: "./env" });  // everywjer we have import--> here we have require !?

import dotenv from "dotenv"; // config bhi krna hai dotenv ko
import connectDB from "./DB/index_db.js";

dotenv.config({
  path: "./env",
});

connectDB();

/* ANOTHER APPROACH

import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR : ", error);
    throw error;
  }
})(); // iffy function
*/
