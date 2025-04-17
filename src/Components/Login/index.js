import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]); // `navigate` is added to the dependency array

  const onLoginSuccess = (responseData) => {
    Cookies.set("jwt_token", responseData.token);
    Cookies.set("yourUserName", username);
    window.location.href = "/";
  };

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors", // Explicitly enabling CORS
      });
      if (!response.ok) {
        // If the response is not OK, show an error message
        const errorData = await response.json();
        setError(errorData);
      } else {
        // If login is successful, showing the token from the response
        const responseData = await response.json();
        console.log(responseData);
        console.log("Login successful, token:", responseData.token);
        onLoginSuccess(responseData);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError({
        errorMessage: "A network error occurred. Please try again later.",
      });
    }
    setUserName("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h1 className="logo-head">Login</h1>
      <p className="login-para">Glad you're back!</p>
      <form className="login-form-container" onSubmit={onSubmitLoginForm}>
        <label htmlFor="username" className="login-form">
          Username/Email
        </label>
        <input
          id="username"
          type="email"
          placeholder="email"
          className="login-form-input"
          name="username"
          onChange={onChangeUserName}
          value={username}
          required
        />
        <label htmlFor="password" className="login-form">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="login-form-input"
          onChange={onChangePassword}
          value={password}
          required
        />
        <button type="submit" className="button-login">
          Login
        </button>
        <p className="signup-para">
          <Link to="/signup">don't have an account, signup</Link>
        </p>
        {error && (
          <p className="error-message" style={{ color: "red" }}>
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
};
export default Login;
