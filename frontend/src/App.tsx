import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "../src/pages/login-signup-page";
// Remove separate Signup component since it’s handled in Login now.

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Login />} />
          {/* Optional: redirect or fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
