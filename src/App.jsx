import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Plans from "./components/Plans";
import Applications from "./components/Applications";
import Claims from "./components/Claims";
import Users from "./components/Users";

function App() {
  return (
    <Router>
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
