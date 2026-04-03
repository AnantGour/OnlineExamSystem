import React, { useEffect, useState } from "react";
import ExamCard from "../components/ExamCard";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch exams
        const examRes = await axios.get("http://localhost:5000/api/exams");

        // ✅ Fetch results (scorecard)
        const resultRes = await axios.get("http://localhost:5000/api/results");

        setExams(examRes.data);
        setResults(resultRes.data);

      } catch (err) {
        console.log(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">

      <h2>Available Exams</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* ✅ Exams Section */}
      <div className="exam-list">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <ExamCard key={exam._id} exam={exam} />
          ))
        ) : (
          !loading && <p>No exams available</p>
        )}
      </div>

      {/* ✅ Scorecard Section */}
      <h2>Your Scorecard</h2>

      <div className="scorecard-list">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result._id} className="scorecard">
              <h3>{result.examTitle}</h3>
              <p>Score: {result.score}</p>
              <p>Total: {result.total}</p>
              <p>
                Percentage:{" "}
                {((result.score / result.total) * 100).toFixed(2)}%
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No results yet</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;