import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getAllTasks } from "../services/api";

import "../styles/pages.css";

function CalendarView() {

  const today =
    new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

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

  const filteredTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Calendar" />

        <div className="page-container">

          <div className="calendar-card">

            <h2>Task Calendar</h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

            <h3>
              Tasks for {selectedDate}
            </h3>

            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                No tasks scheduled for this date.
              </div>
            ) : (

              filteredTasks.map((task) => (

                <div
                  className="calendar-task"
                  key={task.id}
                >

                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>

                  <span className="priority">
                    {task.priority}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default CalendarView;