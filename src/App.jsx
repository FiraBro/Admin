import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Plans from "./components/Plans";
import Applications from "./components/Applications";
import Claims from "./components/Claims";
import Users from "./components/Users";
import Login from "./page/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn, role } = useContext(AuthContext);

  const isAdmin = isLoggedIn && role === "admin";

  return (
    <Router>
      {isAdmin ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
