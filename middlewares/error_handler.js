errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(res.locals.error);

  res.status(err.status || 400);
  res.json({
    isSuccess: false,
    message: res.locals.message,
    detail: res.locals.error,
  });
};

module.exports = errorHandler;
