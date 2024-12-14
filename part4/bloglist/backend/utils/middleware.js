import jwt from "jsonwebtoken";
import config from "./config.js";

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

const authenticateToken = (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }
  jwt.verify(token, config.SECRET, (err, user) => {
    if (err) {
      return response.sendStatus(403);
    }
    request.user = user;
    next();
  });
};

export default { errorHandler, authenticateToken };
