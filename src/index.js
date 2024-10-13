// require("dotenv").config({ path: "./env" });  // everywhere we have import--> here we have require !?

import dotenv from "dotenv"; // config bhi krna hai dotenv ko if we use import
import connectDB from "./DB/index.db.js";

import express from "express";
const app = express();

dotenv.config({
  path: "./env",
});

connectDB() // asynchronous method return promise
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed!", err);
  });

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
})(); // iffe function
*/
