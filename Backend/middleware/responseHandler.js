/**
 * Usage:
 *  res.success(data, message);
 *  res.error(error, statusCode);
 */
const responseHandler = (req, res, next) => {
  res.success = (data = {}, message = "Success") => {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  };

  res.error = (error = {}, statusCode = 500) => {
    const message = error?.message || "Internal Server Error";

    res.status(statusCode).json({
      status: "error",
      message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  };

  next();
};

export default responseHandler;
