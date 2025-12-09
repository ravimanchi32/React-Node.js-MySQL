import React from "react";

export default function Welcome() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Welcome, {username} 🎉
      </h1>
    </div>
  );
}
