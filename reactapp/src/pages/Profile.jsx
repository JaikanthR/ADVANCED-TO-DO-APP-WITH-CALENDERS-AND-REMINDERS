import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getUser,
  updateUser,
} from "../services/api";

import "../styles/pages.css";

function Profile() {

  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    active: true,
  });

  useEffect(() => {

    if (!userId) return;

    getUser(userId)
      .then((response) =>
        setUser(response.data)
      )
      .catch((error) =>
        console.log(error)
      );

  }, [userId]);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const updateProfile = async (e) => {

    e.preventDefault();

    try {

      const response =
        await updateUser(userId, user);

      setUser(response.data);

      localStorage.setItem(
        "name",
        response.data.name
      );

      alert("Profile updated successfully!");

    } catch (error) {

      console.log(error);

      alert("Unable to update profile");

    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar title="Profile" />

        <div className="page-container">

          <div className="profile-card">

            <div className="profile-avatar">
              {user.name?.charAt(0)}
            </div>

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <form onSubmit={updateProfile}>

              <label>Name</label>

              <input
                name="name"
                value={user.name}
                onChange={handleChange}
              />

              <label>Email</label>

              <input
                value={user.email}
                disabled
              />

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />

              <button className="primary-btn">
                Update Profile
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;