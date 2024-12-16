const LoginForm = ({ credentials, handleLogin, handleCredentialsChange }) => {
  return (
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
  );
};

export default LoginForm;
