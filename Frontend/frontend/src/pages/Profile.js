import React from "react";
import "./Profile.css";

function Profile() {
  const user = {
    name: "Abhinav Gupta",
    email: "abhinav@gmail.com",
    role: "Student",
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name.charAt(0)}
        </div>

        <h2 className="profile-title">Profile</h2>

        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;