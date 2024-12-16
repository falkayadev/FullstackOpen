import { useState, useEffect, useRef } from "react";
import CreateForm from "./components/CreateForm";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import useUser from "./hooks/useUser";
import useBlogs from "./hooks/useBlogs";
import helpers from "./utils/helpers";
import Togglable from "./components/Togglable";

const App = () => {
  const [errorMessage, setErrorMessage] = useState({
    type: null,
    message: null,
  });
  const [user, setUser] = useUser();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const [blogs, setBlogs] = useBlogs(
    user,
    setUser,
    setErrorMessage,
    handleLogout
  );

  // handle actions
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });
      loginFormRef.current.toggleVisibility();
      helpers.notify("success", "Login successful", 5000, setErrorMessage);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setCredentials({ username: "", password: "" });
    } catch (error) {
      if (error.status === 500) {
        setErrorMessage({ type: "error", message: "Server error" });
      }
      console.log(error);
    }
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: inputs.title,
        author: inputs.author,
        url: inputs.url,
      });
      createFormRef.current.toggleVisibility();
      helpers.notify(
        "success",
        `${user.name} created a new blog titled ${newBlog.title}`,
        5000,
        setErrorMessage
      );
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog));
      setInputs({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      helpers.notify("error", "Blog creation failed!", 5000, setErrorMessage);
    }
  };

  // handle form input changes
  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const loginFormRef = useRef();
  const createFormRef = useRef();
  const renderLogin = () => (
    <>
      <Header errorMessage={errorMessage} title="Log in to application" />
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm
          handleLogin={handleLogin}
          credentials={credentials}
          errorMessage={errorMessage}
          handleCredentialsChange={handleCredentialsChange}
        />
      </Togglable>
    </>
  );

  const renderMainApp = () => (
    <div>
      <Header errorMessage={errorMessage} title="Blogs" />
      <Togglable buttonLabel="user settings">
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </Togglable>
      <Togglable buttonLabel="create a new blog" ref={createFormRef}>
        <CreateForm
          createBlog={createBlog}
          inputs={inputs}
          onChange={handleInputsChange}
        />
      </Togglable>
      <BlogList blogs={blogs} />
    </div>
  );

  return user === null ? renderLogin() : renderMainApp();
};

export default App;
