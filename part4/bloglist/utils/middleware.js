const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.code === 11000) {
    return response.status(400).json({ error: "username must be unique" });
  }

  next(error);
};

export default { errorHandler };
