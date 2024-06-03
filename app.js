var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require('dotenv').config()

var indexRouter = require("./routes/index");
var errorHandler = require("./middlewares/error_handler")
const db = require("./config/db");
db.connect();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

indexRouter(app);

// catch 404 error
app.use(function (req, res, next) {
  err = createError(404)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(404).render('error');
});
// error handler
app.use(errorHandler);

module.exports = app;
