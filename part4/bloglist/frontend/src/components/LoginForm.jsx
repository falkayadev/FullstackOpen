import Notification from "./Notification";

const LoginForm = ({
  credentials,
  handleLogin,
  handleCredentialsChange,
  errorMessage,
  loginVisible,
  toggleLoginVisible,
}) => {
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };
  return (
    <div>
      {errorMessage && (
        <Notification type={errorMessage.type} message={errorMessage.message} />
      )}
      <h2>Log in to application</h2>
      <button style={hideWhenVisible} onClick={() => toggleLoginVisible(true)}>
        login
      </button>
      <form onSubmit={handleLogin} style={showWhenVisible}>
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
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLoginVisible(false);
          }}
        >
          cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
