import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Send verification code to email
const sendCode = async () => {
  try {
    const res = await fetch("http://localhost:3000/users/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) setMessage(data.message || "Failed to send code");
    else setMessage("Verification code sent to your email!");
  } catch (error) {
    console.error("Send code error:", error);
    setMessage("Something went wrong");
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
      } else {
        console.log("Login success:", data);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="login-email" className="block mb-2 text-sm text-gray-400">
          Email
        </label>
        <div className="flex gap-2">
          <input
            id="login-email"
            type="email"
            placeholder="your.email@example.com"
            className="flex-1 px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={sendCode}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Send Code
          </button>
        </div>
        {message && <p className="mt-1 text-sm text-green-400">{message}</p>}
      </div>

      <input
        id="verify-code"
        type="text"
        placeholder="Enter the code sent to your email"
        className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={confirmCode}
        onChange={(e) => setConfirmCode(e.target.value)}
        required
      />

      <div>
        <label htmlFor="login-password" className="block mb-2 text-sm text-gray-400">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mt-1 text-xs text-blue-400 cursor-pointer hover:underline">
          Forgot Password?
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
}
