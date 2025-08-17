// src/components/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // حذف توکن از localStorage
    localStorage.removeItem("token");

    // هدایت کاربر به صفحه ورود
    navigate("/login");
  }, [navigate]);


  return <p>Logging out...</p>;
};

export default Logout;
