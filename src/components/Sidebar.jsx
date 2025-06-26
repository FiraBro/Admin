import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  FaTimes,
  FaBars,
  FaChartLine,
  FaFileAlt,
  FaClipboardCheck,
  FaHandHoldingUsd,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-blue-800 text-white 
        shadow-lg transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-xl font-bold">Insurance Admin</span>
          </div>
        </div>

        <nav className="mt-8 flex-1">
          <NavItem
            to="/dashboard"
            icon={<FaChartLine className="w-5 h-5" />}
            label="Dashboard"
            closeSidebar={() => setSidebarOpen(false)}
          />
          <NavItem
            to="/plans"
            icon={<FaFileAlt className="w-5 h-5" />}
            label="Insurance Plans"
            closeSidebar={() => setSidebarOpen(false)}
          />
          <NavItem
            to="/applications"
            icon={<FaClipboardCheck className="w-5 h-5" />}
            label="Applications"
            closeSidebar={() => setSidebarOpen(false)}
          />
          <NavItem
            to="/claims"
            icon={<FaHandHoldingUsd className="w-5 h-5" />}
            label="Claims Review"
            closeSidebar={() => setSidebarOpen(false)}
          />
          <NavItem
            to="/users"
            icon={<FaUsers className="w-5 h-5" />}
            label="User Management"
            closeSidebar={() => setSidebarOpen(false)}
          />
          <NavItem
            to="/settings"
            icon={<FaCog className="w-5 h-5" />}
            label="Settings"
            closeSidebar={() => setSidebarOpen(false)}
          />
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 w-full text-left hover:bg-blue-700 transition-all duration-300"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-blue-200">admin@insurance.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, closeSidebar }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-6 py-3 transition-all duration-300 hover:bg-blue-700 ${
          isActive ? "bg-blue-700" : ""
        }`
      }
      onClick={() => {
        if (window.innerWidth < 768) {
          closeSidebar();
        }
      }}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
    </NavLink>
  );
};

export default Sidebar;
