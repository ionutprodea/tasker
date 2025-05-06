import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoggedUser = () => {
  const [logoutToggle, setLogoutToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleUserClick = () => {
    setLogoutToggle(!logoutToggle);
  };

  const handleLogout = () => {
    sessionStorage.setItem("tasker-auth-token", "");
    sessionStorage.setItem("tasker-logged-user", "");
    localStorage.setItem("tasker-logged-user", "");
    localStorage.setItem("tasker-auth-token", "");
    navigate("/login");
  };

  useEffect(() => {
    const rememberUser = localStorage.getItem("tasker-logged-user");
    if (rememberUser) setUserName(rememberUser);
    const loggedUser = sessionStorage.getItem("tasker-logged-user");
    if (loggedUser) setUserName(loggedUser);
  }, []);

  return (
    <div className="user-menu">
      {userName && (
        <div>
          <button className="nav-link" onClick={handleUserClick}>
            {userName} <FaUserCircle className="mb-1 ms-1 me-1" />
          </button>
        </div>
      )}
      {logoutToggle && (
        <div>
          <button className="nav-link btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoggedUser;
