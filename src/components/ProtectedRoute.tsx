import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("tasker-auth-token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
