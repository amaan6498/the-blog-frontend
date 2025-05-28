import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]); // `navigate` is added to the dependency array

  const onRegistrationSuccess = () => {
    alert("Registration Successful");
    navigate("/login");
  };

  const onSubmitSignUpForm = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }

    const data = {
      username: username,
      password: password,
    };

    // http://localhost:5000/register
    try {
      const response = await fetch(
        "https://blog-api-qyqz.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors", // Explicitly enabling CORS
        }
      );
      if (!response.ok) {
        // If the response is not OK, show an error message
        const errorData = await response.json();
        setError(errorData);
      } else {
        // If Registration is successful
        const responseData = await response.json();
        console.log(responseData);
        console.log("Registration successful");
        onRegistrationSuccess();
      }
    } catch (error) {
      console.error("Network error:", error);
      setError({
        errorMessage: "A network error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="signup-container">
      <h1 className="logo-head">Sign Up</h1>
      <p className="signup-para">Create a new account</p>
      <form className="signup-form-container" onSubmit={onSubmitSignUpForm}>
        <label htmlFor="username" className="signup-form">
          Username/Email
        </label>
        <input
          id="username"
          type="text"
          placeholder="email"
          className="signup-form-input"
          name="username"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <label htmlFor="password" className="signup-form">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="signup-form-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="confirm-password" className="signup-form">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          className="signup-form-input"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <button type="submit" className="button-signup">
          Sign Up
        </button>
        <p className="login-para">
          <Link to="/login">Already have an account? Log in</Link>
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
export default Signup;
