import { response } from "express";

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

const getToken = (request, response, next) => {
  const authorization = request.get("authorization");
  request.token =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.replace("Bearer ", "")
      : null;
  next();
};

export default { errorHandler, getToken };
