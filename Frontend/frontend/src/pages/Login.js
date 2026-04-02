import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Save user in context
      setUser(data.user);

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      setError(err.message || "Login failed");
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