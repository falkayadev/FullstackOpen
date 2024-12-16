import { useState, useEffect } from "react";
import blogService from "../services/blogService";
import helpers from "../utils/helpers";

const useBlogs = (user, setUser, setErrorMessage, handleLogout) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll();
          setBlogs(blogs);
        } catch (error) {
          if (error.status === 401) {
            localStorage.removeItem("user");
            setUser(null);
            helpers.notify(
              "error",
              "Your login has expired or is invalid",
              5000,
              setErrorMessage
            );
            handleLogout();
          } else {
            console.error("Failed to fetch blogs:", error);
          }
        }
      }
    };

    fetchBlogs();
  }, [user]);

  return [blogs, setBlogs];
};

export default useBlogs;
