import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getAllTasks } from "../services/api";

import "../styles/pages.css";

function Reports() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    getAllTasks()
      .then((response) =>
        setTasks(response.data)
      )
      .catch((error) =>
        console.log(error)
      );

  }, []);

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const completionRate =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Reports & History" />

        <div className="page-container">

          <div className="report-grid">

            <div className="report-card">
              <h3>Total Tasks</h3>
              <strong>{total}</strong>
            </div>

            <div className="report-card">
              <h3>Completed</h3>
              <strong>{completed}</strong>
            </div>

            <div className="report-card">
              <h3>Pending</h3>
              <strong>{pending}</strong>
            </div>

            <div className="report-card">
              <h3>High Priority</h3>
              <strong>{high}</strong>
            </div>

          </div>

          <div className="progress-card">

            <h2>Completion Rate</h2>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${completionRate}%`,
                }}
              />

            </div>

            <h3>
              {completionRate}% completed
            </h3>

          </div>

          <div className="history-card">

            <h2>Task History</h2>

            {tasks.map((task) => (

              <div
                className="history-item"
                key={task.id}
              >

                <div>
                  <strong>{task.title}</strong>
                  <p>{task.date}</p>
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

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;