import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true, // parsing is done using qs library --> more complex nested data structures
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
// routes declaration
app.use("/users", userRouter); //http://localhost:8000/api/v1/users/register

export { app };
