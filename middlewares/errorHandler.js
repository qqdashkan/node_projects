const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    status: err.status,
    message: `Error: ${err.message}`,
  });
  next();
};

module.exports = errorHandler;
