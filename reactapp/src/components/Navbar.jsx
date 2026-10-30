import React from "react";

function Navbar({ title }) {

  const name = localStorage.getItem("name") || "User";

  return (
    <header className="topbar">

      <div>
        <h2>{title}</h2>
        <p>Welcome back, {name} 👋</p>
      </div>

      <div className="user-info">
        <div className="avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <span>{name}</span>
      </div>

    </header>
  );
}

export default Navbar;