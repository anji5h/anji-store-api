const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRoute = require("./routes/api.route");
require("dotenv").config();
//database config
require("./mongoose");
//cookie parser
app.use(cookieParser());
//cors config
app.use(
  cors({
    origin: ["http://localhost:4000"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api route
app.use("/api", apiRoute);
//error handeling middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message || "internal server error." });
});
const port = process.env.PORT || 4001;
//listen to port
app.listen(port, function (err) {
  if (err) {
    return console.log("server listening failed\n", err);
  }
  console.log(`server listening at port ${port}`);
});
