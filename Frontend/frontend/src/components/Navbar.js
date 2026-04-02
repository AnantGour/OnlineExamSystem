import React from "react";
import "./Navbar.css";
function Navbar(){
  return(
    <div className="navbar">
      <h2>Online Exam System</h2>
      <div>
        <button>Dashboard</button>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;