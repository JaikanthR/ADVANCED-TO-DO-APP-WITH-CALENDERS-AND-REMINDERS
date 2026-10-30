import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { addTask } from "../services/api";

import "../styles/tasks.css";

function AddTask() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pending",
    priority: "Medium",
    completed: false,
  });

  const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addTask({
        ...task,
        user: {
          userId: Number(userId),
        },
      });

      alert("Task added successfully!");

      navigate("/tasks");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Unable to create task"
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Add Task" />

        <div className="form-container">

          <div className="form-card">

            <h2>Create New Task</h2>

            <p>
              Add a task and organize your day.
            </p>

            <form onSubmit={handleSubmit}>

              <label>Task Title</label>

              <input
                name="title"
                placeholder="Enter task title"
                value={task.title}
                onChange={handleChange}
                required
              />

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Enter task description"
                value={task.description}
                onChange={handleChange}
                rows="4"
              />

              <label>Deadline</label>

              <input
                type="date"
                name="date"
                value={task.date}
                onChange={handleChange}
                 min={new Date().toISOString().split("T")[0]}
                required
              />

              <label>Priority</label>

              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label>Status</label>

              <select
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
               
              </select>

              <button className="primary-btn">
                Create Task
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AddTask;