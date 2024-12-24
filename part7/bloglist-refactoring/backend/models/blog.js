import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// first parameter: model name
// second parameter: schema
// third parameter: collection name
const Blog = mongoose.model("Blog", blogSchema, "blogs");

export default Blog;
