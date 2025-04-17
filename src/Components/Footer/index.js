import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <Link to={"https://www.github.com/amaan6498"} className="footer-link">
        <FiGithub />
      </Link>
      <Link
        to={"https://www.linkedin.com/in/amaanpeshimam"}
        className="footer-link"
      >
        <FiLinkedin />
      </Link>
      <Link
        to={"https://www.instagram.com/iam.aan07/#"}
        className="footer-link"
      >
        <FiInstagram />
      </Link>
    </footer>
  );
};
export default Footer;
