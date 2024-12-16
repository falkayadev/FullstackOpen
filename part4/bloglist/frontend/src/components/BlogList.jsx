import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </ul>
  );
};

export default BlogList;
