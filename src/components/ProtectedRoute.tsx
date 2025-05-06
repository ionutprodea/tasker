import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/token";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
