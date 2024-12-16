import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog }) => {
  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
  ));
};

export default BlogList;
