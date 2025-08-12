import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
    } else {
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      // Redirect or update UI here if needed
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
        <input
          id="login-email"
          type="email"
          placeholder="your.email@example.com"
          className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

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
