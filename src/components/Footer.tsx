import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer d-flex align-items-center justify-content-center">
      <div className="centered-container m-5">
        <Link to={"/about"} className="nav-link px-4">
          About
        </Link>
        <Link to={"/contact"} className="nav-link px-4">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Footer;
