import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext"; // ✅ FIXED
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
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Exam System
      </h2>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="user-name">Hi, {user?.name}</span>

            <button onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            {/* ✅ Profile Button */}
            <button onClick={() => navigate("/profile")}>
              Profile
            </button>

            <button onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* ✅ Using Link (better UX) */}
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