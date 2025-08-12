import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup API call here
    console.log("Signing up with", { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="signup-name" className="block mb-2 text-sm text-gray-400">
          Name
        </label>
        <input
          id="signup-name"
          type="text"
          placeholder="Full name"
          className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="block mb-2 text-sm text-gray-400">
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block mb-2 text-sm text-gray-400">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          placeholder="Enter a password"
          className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
