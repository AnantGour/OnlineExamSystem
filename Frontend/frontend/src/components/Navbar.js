import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Exam System
      </h2>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="user-name">Hi, {user?.name}</span>

            {/* ✅ Dashboard Link (BEST PRACTICE) */}
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>

            <Link to="/profile">
              <button>Profile</button>
            </Link>

            <button onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;