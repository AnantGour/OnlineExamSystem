import React, { useEffect, useState } from "react";
import { UserData } from "../context/UserContext";
import API from "../api/axios";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";

function Dashboard() {
  // ⚡ Hooks always at top
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚡ Get user context safely
  const context = UserData();
  const user = context?.user;

  // ⚡ Fetch dashboard data
  useEffect(() => {
    if (!user) return; // exit early if user not available

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all published exams
        const examsRes = await API.get("/exams");
        const now = new Date();

        setUpcomingExams(
          examsRes.data.filter(
            (ex) => ex.isPublished && new Date(ex.startTime) > now
          )
        );

        setPastExams(
          examsRes.data.filter(
            (ex) => ex.isPublished && new Date(ex.endTime) < now
          )
        );

        // Fetch user results
        const resultsRes = await API.get(`/results/user/${user._id}`);
        setResults(resultsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // ⚡ Conditional render if user not ready
  if (!user) return <p>Loading user data...</p>;

  // ⚡ Prepare chart data
  const subjectAnalytics = selectedResult?.subjectWiseAnalysis || [];
  const subjectChartData = {
    labels: subjectAnalytics.map((s) => s.subject),
    datasets: [
      {
        label: "Correct",
        data: subjectAnalytics.map((s) => s.correct),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Wrong",
        data: subjectAnalytics.map((s) => s.wrong),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
      {
        label: "Skipped",
        data: subjectAnalytics.map((s) => s.skipped),
        backgroundColor: "rgba(201,203,207,0.6)",
      },
    ],
  };

  const perQuestionTimeData =
    selectedResult?.answers.map((a) => a.timeTaken) || [];
  const perQuestionLabels =
    selectedResult?.answers.map((a, i) => `Q${i + 1}`) || [];
  const perQuestionChartData = {
    labels: perQuestionLabels,
    datasets: [
      {
        label: "Time Taken (seconds)",
        data: perQuestionTimeData,
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>

      {loading && <p>Loading dashboard...</p>}

      <section>
        <h3>Upcoming Exams</h3>
        {upcomingExams.length === 0 && <p>No upcoming exams</p>}
        {upcomingExams.map((ex) => (
          <div key={ex._id} className="exam-card">
            <h4>{ex.title}</h4>
            <p>{ex.description}</p>
            <p>Duration: {ex.duration} min</p>
            <p>Total Marks: {ex.totalMarks}</p>
            <p>Start: {new Date(ex.startTime).toLocaleString()}</p>
            <p>End: {new Date(ex.endTime).toLocaleString()}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>Past Exams & Results</h3>
        {pastExams.length === 0 && <p>No past exams</p>}
        {pastExams.map((ex) => {
          const result = results.find((r) => r.exam._id === ex._id);
          return (
            <div key={ex._id} className="exam-card">
              <h4>{ex.title}</h4>
              <p>Score: {result?.score ?? "Not Attempted"}</p>
              <p>Status: {result?.status ?? "-"}</p>
              {result && (
                <button onClick={() => setSelectedResult(result)}>
                  View Details
                </button>
              )}
            </div>
          );
        })}
      </section>

      {selectedResult && (
        <section className="result-details">
          <h3>
            Exam: {selectedResult.exam.title} - Detailed Analysis
          </h3>
          <p>Total Questions: {selectedResult.totalQuestions}</p>
          <p>Attempted: {selectedResult.attempted}</p>
          <p>Correct: {selectedResult.correct}</p>
          <p>Wrong: {selectedResult.wrong}</p>
          <p>Skipped: {selectedResult.skipped}</p>
          <p>Score: {selectedResult.score}</p>
          <p>Percentage: {selectedResult.percentage.toFixed(2)}%</p>
          <p>Total Time Allowed: {selectedResult.totalTime} sec</p>
          <p>Time Taken: {selectedResult.timeTaken} sec</p>

          <h4>Per Subject Analysis</h4>
          <Bar data={subjectChartData} />

          <h4>Per Question Time</h4>
          <Bar data={perQuestionChartData} />
        </section>
      )}
    </div>
  );
}

export default Dashboard;