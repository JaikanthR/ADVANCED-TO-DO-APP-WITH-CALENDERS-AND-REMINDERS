import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// USERS
export const registerUser = (user) =>
  API.post("/api/users/register", user);

export const loginUser = (email, password) =>
  API.post("/api/users/login", null, {
    params: { email, password },
  });

export const getUser = (id) =>
  API.get(`/api/users/${id}`);

export const updateUser = (id, user) =>
  API.put(`/api/users/update/${id}`, user);

export const logoutUser = (id) =>
  API.post(`/api/users/${id}/logout`);

// TASKS
export const getAllTasks = () =>
  API.get("/api/tasks/all");

export const getTasksByUser = (userId) =>
  API.get(`/api/tasks/user/${userId}`);

export const getTaskById = (id) =>
  API.get(`/api/tasks/${id}`);

export const addTask = (task) =>
  API.post("/api/tasks/add", task);

export const deleteTask = (id) =>
  API.delete(`/api/tasks/delete/${id}`);

export const completeTask = (id) =>
  API.put(`/api/tasks/${id}/complete`);

export const setPriority = (id, priority) =>
  API.put(`/api/tasks/${id}/priority`, null, {
    params: { priority },
  });

// REMINDERS
export const getAllReminders = () =>
  API.get("/reminders/all");

export const getReminderById = (id) =>
  API.get(`/reminders/${id}`);

export const addReminder = (taskId, reminder) =>
  API.post(`/reminders/scheduleReminder/taskId/${taskId}`, reminder);

export const deleteReminder = (id) =>
  API.delete(`/reminders/cancel/${id}`);

export const completeReminder = (id) =>
  API.put(`/reminders/complete/${id}`);

export default API;