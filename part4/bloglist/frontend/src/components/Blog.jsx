import { useState } from "react";

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const blogRow = { display: "flex", gap: "10px" };
  return (
    <div style={blogStyle}>
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
        <>
          <p>{blog.url}</p>
          <div style={blogRow}>
            <p>
              likes <span>{blog.likes}</span>
            </p>
            <button onClick={() => console.log("Liked!")}>like</button>
          </div>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
