import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const NavBar = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleScroll = () => {
    // Calculate the threshold (10vh) to trigger the blur effect
    const scrollThreshold = window.innerHeight * 0.05; // 10% of viewport height
    if (window.scrollY > scrollThreshold) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  };

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav-container ${isBlurred ? "blur" : ""}`}>
      <h1 className="nav-header">THE BLOG</h1>
      <ul className="nav-list">
        <li>
          <Link to="/" className="link-nav">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/about" className="link-nav">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="link-nav">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/addblog" className="link-nav">
            Write
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link className="link-nav" onClick={onClickLogout}>
              Log out
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="link-nav">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
