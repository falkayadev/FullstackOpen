import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateForm from "./components/CreateForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false);
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
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll();
          setBlogs(blogs);
        } catch (error) {
          handleLogout();
        }
      }
    };

    fetchBlogs();
  }, [user]);

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
      helper.notify("success", "Login successful");
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setCredentials({ username: "", password: "" });
    } catch (error) {
      if (error.status === 500) {
        setErrorMessage({ type: "error", message: "Server error" });
      }
      console.log(error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(null);
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
      setInputs({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      helper.notify("error", "Blog creation failed!");
    }
  };

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        credentials={credentials}
        errorMessage={errorMessage}
        handleCredentialsChange={handleCredentialsChange}
        loginVisible={loginVisible}
        toggleLoginVisible={(val) => setLoginVisible(val)}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && (
        <Notification type={errorMessage.type} message={errorMessage.message} />
      )}
      <span>{user.username} logged in</span>
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
