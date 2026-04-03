import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import API from "../api/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = UserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Save data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="common-btn">
            {loading ? "Please Wait..." : "Login"}
          </button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;