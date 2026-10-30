import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getAllTasks,
  deleteTask,
  completeTask,
  setPriority,
} from "../services/api";

import "../styles/tasks.css";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {

    try {

      const response = await getAllTasks();

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (id) => {

    try {

      await completeTask(id);

      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {

      await deleteTask(id);

      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const handlePriority = async (id, priority) => {

    try {

      await setPriority(id, priority);

      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {

    const searchMatch =
      task.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Completed"
        ? task.completed
        : !task.completed);

    const priorityMatch =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      searchMatch &&
      statusMatch &&
      priorityMatch
    );
  });

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="My Tasks" />

        <div className="tasks-content">

          <div className="task-toolbar">

            <input
              className="search-input"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">
                Completed
              </option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="All">
                All Priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>

          <div className="tasks-grid">

            {filteredTasks.map((task) => (

              <div
                className="task-card"
                key={task.id}
              >

                <div className="task-card-header">

                  <h3>{task.title}</h3>

                  <span
                    className={`priority ${task.priority?.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                </div>

                <p className="task-description">
                  {task.description}
                </p>

                <div className="task-date">
                  📅 {task.date}
                </div>

                <div className="task-card-footer">

                  <span
                    className={
                      task.completed
                        ? "status completed"
                        : "status pending"
                    }
                  >
                    {task.completed
                      ? "Completed"
                      : task.status}
                  </span>

                  <div className="task-actions">

                    {!task.completed && (
                      <button
                        onClick={() =>
                          handleComplete(task.id)
                        }
                        title="Complete"
                      >
                        ✓
                      </button>
                    )}

                    <select
                      value={task.priority}
                      onChange={(e) =>
                        handlePriority(
                          task.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="High">
                        High
                      </option>
                      <option value="Medium">
                        Medium
                      </option>
                      <option value="Low">
                        Low
                      </option>
                    </select>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(task.id)
                      }
                    >
                      🗑
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filteredTasks.length === 0 && (
            <div className="empty-state">
              No matching tasks found.
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Tasks;