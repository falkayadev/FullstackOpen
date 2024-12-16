import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

export default BlogList;
