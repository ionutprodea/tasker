import { Link } from "react-router-dom";
import LoggedUser from "./LoggedUser";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState("");
  useEffect(() => {
    const rememberUser = localStorage.getItem("tasker-logged-user");
    if (rememberUser) setIsLogged(rememberUser);
    const loggedUser = sessionStorage.getItem("tasker-logged-user");
    if (loggedUser) setIsLogged(loggedUser);
  }, []);
  return (
    <>
      <nav
        className="navbar navbar-expand-md  rounded-bottom-4"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand me-5 ms-4 nav-link">
            TASKER
          </Link>
          <button
            className="navbar-toggler me-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-4" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <Link to={"/tasks"} className="nav-link">
                  Show Tasks
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link to={"/add"} className="nav-link">
                  Add Tasks
                </Link>
              </li>
              {!isLogged && (
                <li className="nav-item me-3">
                  <Link to={"/login"} className="nav-link">
                    Log in
                  </Link>
                </li>
              )}
              <li className="nav-item me-3 logged-user">
                <LoggedUser />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
