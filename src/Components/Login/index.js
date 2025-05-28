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
  }, [navigate]);

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
    const data = { username, password };
    console.log(data);

    try {
      const response = await fetch("https://blog-api-qyqz.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
      } else {
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
  };

  const onGuestLogin = async (event) => {
    event.preventDefault(); // Prevent the form from submitting when guest login is clicked

    const guestUserName = "arman@gmail.com";
    const guestPassword = "getjar123";

    console.log("Guest login credentials:", guestUserName, guestPassword);

    setUserName(guestUserName);
    setPassword(guestPassword);

    // Submit the form automatically
    onSubmitLoginForm(new Event("submit"));
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
        <button
          type="button"
          className="button-login mg-1"
          onClick={onGuestLogin}
        >
          Continue as Guest
        </button>
        <p className="signup-para">
          <Link to="/signup">Don't have an account? Signup</Link>
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
