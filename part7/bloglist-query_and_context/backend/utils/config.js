import dotenv from "dotenv";
dotenv.config();

export default {
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
