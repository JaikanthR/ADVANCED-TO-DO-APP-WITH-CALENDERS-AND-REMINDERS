import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getTasksByUser } from "../services/api";

import "../styles/dashboard.css";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {

    try {
       const userId = localStorage.getItem("userId");
      const response = await getTasksByUser(userId);

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  const highPriority = tasks.filter(
    (task) =>
      task.priority?.toLowerCase() === "high"
  ).length;

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Dashboard" />

        <section className="dashboard-content">

          <div className="welcome-box">
            <div>
              <h1>Stay productive 🚀</h1>
              <p>
                Organize your tasks and achieve your goals.
              </p>
            </div>

            <Link
              to="/add-task"
              className="primary-btn add-btn"
            >
              + Add New Task
            </Link>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div>
                <h3>{total}</h3>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✓</div>
              <div>
                <h3>{completed}</h3>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div>
                <h3>{pending}</h3>
                <p>Pending</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div>
                <h3>{highPriority}</h3>
                <p>High Priority</p>
              </div>
            </div>

          </div>

          <div className="section-header">

            <h2>Recent Tasks</h2>

            <Link to="/tasks">
              View All →
            </Link>

          </div>

          <div className="task-list">

            {tasks.slice(0, 5).map((task) => (

              <div className="dashboard-task" key={task.id}>

                <div>

                  <h3>{task.title}</h3>

                  <p>
                    {task.description}
                  </p>

                </div>

                <span
                  className={
                    task.completed
                      ? "status completed"
                      : "status pending"
                  }
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>

              </div>

            ))}

            {tasks.length === 0 && (
              <div className="empty-state">
                No tasks available.
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;