import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateForm from "./components/CreateForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import Notification from "./components/Notification";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const helper = {
    notify: (type, message, timeout = 5000) => {
      setErrorMessage({ type, message });
      setTimeout(() => {
        setErrorMessage(null);
      }, timeout);
    },
  };

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });
      blogService.setToken(user.token);
      helper.notify("success", "Login successful");
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setCredentials({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    helper.notify("success", "Logout successful", 1000);
  };

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: inputs.title,
        author: inputs.author,
        url: inputs.url,
      });
      helper.notify(
        "success",
        `${user.name} created a new blog titled ${newBlog.title}`
      );
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      helper.notify(
        "error",
        error.response.data.error || "Blog creation failed!"
      );
    }
  };

  if (user === null) {
    return (
      <div>
        {errorMessage && (
          <Notification
            type={errorMessage.type}
            message={errorMessage.message}
          />
        )}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleCredentialsChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleCredentialsChange}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && (
        <Notification type={errorMessage.type} message={errorMessage.message} />
      )}
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <CreateForm
        createBlog={createBlog}
        inputs={inputs}
        onChange={handleInputsChange}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
