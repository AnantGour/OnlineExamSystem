import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import API from "../api/axios"; // ✅ IMPORT AXIOS INSTANCE
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = UserData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password } = formData;

    // ✅ Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // ✅ AXIOS CALL
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      // ✅ Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="common-btn" disabled={loading}>
            {loading ? "Please Wait..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;