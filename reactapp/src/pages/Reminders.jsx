import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getAllReminders,
  getAllTasks,
  addReminder,
  deleteReminder,
  completeReminder,
} from "../services/api";

import "../styles/pages.css";

function Reminders() {

  const [reminders, setReminders] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [taskId, setTaskId] = useState("");
  const [remindTime, setRemindTime] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

 useEffect(() => {
  const shownReminders = new Set();

  const interval = setInterval(() => {
    const now = new Date();

    reminders.forEach(async(reminder) => {
      const reminderTime = new Date(reminder.remindTime);

      const key = `${reminder.reminderId}-${reminder.remindTime}`;

      if (
         reminder.status === "Scheduled" &&
        now.getFullYear() === reminderTime.getFullYear() &&
        now.getMonth() === reminderTime.getMonth() &&
        now.getDate() === reminderTime.getDate() &&
        now.getHours() === reminderTime.getHours() &&
        now.getMinutes() === reminderTime.getMinutes() &&
        !shownReminders.has(key)
      ) {
        shownReminders.add(key);

        const task = tasks.find(
          (task) => task.id === reminder.task?.id
        );

        alert(`🔔 ${task?.title || "Task"} Reminder!`);

        await completeReminder(reminder.reminderId);
        reminder.status = "Completed";
        loadData();
      }
    });
  }, 1000);

  return () => clearInterval(interval);
}, [reminders,tasks]);

  const loadData = async () => {

    try {

      const reminderResponse =
        await getAllReminders();

      const taskResponse =
        await getAllTasks();

      setReminders(reminderResponse.data);
      setTasks(taskResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  const scheduleReminder = async (e) => {

    e.preventDefault();

    if (!taskId) {
      alert("Please select a task");
      return;
    }

    try {

      await addReminder(taskId, {
        remindTime: remindTime,
        status: "Scheduled",
      });

      alert("Reminder scheduled!");

      setTaskId("");
      setRemindTime("");

      loadData();

    } catch (error) {
      console.log(error);
    }
  };

  const cancelReminder = async (id) => {

    try {

      await deleteReminder(id);

      loadData();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Reminders" />

        <div className="page-container">

          <div className="reminder-form">

            <h2>Schedule Reminder</h2>

            <form onSubmit={scheduleReminder}>

              <select
                value={taskId}
                onChange={(e) =>
                  setTaskId(e.target.value)
                }
                required
              >

                <option value="">
                  Select Task
                </option>

                {tasks.map((task) => (

                  <option
                    key={task.id}
                    value={task.id}
                  >
                    {task.title}
                  </option>

                ))}

              </select>

              <input
                type="datetime-local"
                value={remindTime}
                onChange={(e) =>
                  setRemindTime(e.target.value)
                }
                required
              />

              <button className="primary-btn">
                Schedule
              </button>

            </form>

          </div>

          <div className="reminder-list">

            <h2>Scheduled Reminders</h2>

            {reminders.map((reminder) => (

              <div
                className="reminder-card"
                key={reminder.reminderId}
              >

                <div>

                  <h3>
                    🔔 Reminder
                  </h3>

                  <p>
                    {reminder.remindTime}
                  </p>

                  <span>
                    {reminder.status}
                  </span>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    cancelReminder(
                      reminder.reminderId
                    )
                  }
                >
                  Cancel
                </button>

              </div>

            ))}

            {reminders.length === 0 && (
              <div className="empty-state">
                No reminders scheduled.
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reminders;