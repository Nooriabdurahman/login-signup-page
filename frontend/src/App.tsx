import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home-page";
import Athentecation from '../src/pages/anethecation-page/login-signup-page'
import Logout from "./pages/anethecation-page/Logout-page";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* وقتی مسیر / باز شد، مستقیم به /login هدایت شود */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Athentecation />} />
          <Route path="/signup" element={<Athentecation />} />

          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" replace />} />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
