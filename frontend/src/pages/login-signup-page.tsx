import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupFrom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.toLowerCase();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    path.includes("signup") ? "signup" : "login"
  );

  useEffect(() => {
    if (path.includes("signup")) {
      setActiveTab("signup");
    } else {
      setActiveTab("login");
    }
  }, [path]);

  const handleTabClick = (tab: "login" | "signup") => {
    setActiveTab(tab);
    if (tab === "login") navigate("/login");
    else navigate("/signup");
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md rounded-md p-8 text-gray-300 bg-gray-800 shadow-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabClick("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
