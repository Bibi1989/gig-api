import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
const swaggerDoc = require("../swagger.json");

dotenv.config();

const app = express();

// imports
import gigRoute from "./routes/gig";
import userRoute from "./routes/users";

app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// routes
app.use("/api/v1/gig", gigRoute);
app.use("/auth/v1", userRoute);

app.get("*", (req, res) => {
  res.sendFile("index.html");
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);

  if (err) {
    return res.status(err.code).json({ status: "error", error: err.error });
  }
  // render the error page
  // res.status(err.status || 500);
  // res.json({ status: "error", error: err });
});

export default app;
