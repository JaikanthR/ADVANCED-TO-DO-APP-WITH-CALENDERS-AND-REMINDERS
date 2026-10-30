import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";

function Sidebar() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const logout = async () => {
    try {
      if (userId) {
        await logoutUser(userId);
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="logo">
        <span>✓</span>
        TaskFlow
      </div>

      <nav>

        <NavLink to="/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/tasks">
          ✓ My Tasks
        </NavLink>

        <NavLink to="/add-task">
          ＋ Add Task
        </NavLink>

        <NavLink to="/calendar">
          📅 Calendar
        </NavLink>

        <NavLink to="/reminders">
          🔔 Reminders
        </NavLink>

        <NavLink to="/reports">
          📈 Reports
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        ⇥ Logout
      </button>

    </aside>
  );
}

export default Sidebar;