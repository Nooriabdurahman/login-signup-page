import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if no token
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Welcome to Home Page!</h1>
      <p className="mb-6">Only logged-in users can see this page.</p>
      <button
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
