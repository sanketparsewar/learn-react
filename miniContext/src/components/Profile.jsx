import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "#FF5722" }}>Please Login</h1>
        <p style={{ color: "#757575" }}>
          You need to log in to view your profile.
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "#4CAF50" }}>Profile</h1>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            display: "inline-block",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;
