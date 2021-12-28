const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested page was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.title = "error page";
  res.locals.error =
    process.env.NODE_ENV == "development"
      ? err
      : { message: err.message, status: err.status };

  res.status(err.status || 500);
  if (res.app.locals.html) {
    res.render("error");
  } else {
    res.json(res.locals.error);
  }
}
module.exports = {
  notFoundHandler,
  errorHandler,
};
