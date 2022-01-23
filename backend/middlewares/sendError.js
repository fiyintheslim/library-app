const sendError = (err, req, res, next) => {
  const error = err.statusCode || 500;
  const errMessage = err.message || "Internal server error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(error).json({
      success: false,
      errorMessage: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    return res.status(error).json({
      success: false,
      error: errMessage,
    });
  }
};

module.exports = sendError;
