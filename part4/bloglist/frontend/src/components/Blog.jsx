import { useState, useEffect } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const like = () => {
    const updatedBlog = {
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, updatedBlog);
  };
  const remove = (id) => {
    const confirmation = window.confirm("Delete blog?");
    if (confirmation) {
      deleteBlog(id);
    }
  };

  useEffect(() => {
    if (user.username === blog.user.username) {
      setHasRight(true);
    } else {
      setHasRight(false);
    }
  }, [user, blog]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const blogRow = { display: "flex", gap: "10px" };
  return (
    <li style={blogStyle}>
      <div style={blogRow}>
        <p>
          {blog.title} by {blog.author}
        </p>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "hide" : "view"}
        </button>
      </div>
      {isExpanded && (
        <div>
          <p>{blog.url}</p>
          <div style={blogRow}>
            <p>
              likes <span>{blog.likes}</span>
            </p>
            <button onClick={like}>like</button>
          </div>
          <p>{blog.author}</p>
          {hasRight && <button onClick={() => remove(blog.id)}>remove</button>}
        </div>
      )}
    </li>
  );
};

export default Blog;
