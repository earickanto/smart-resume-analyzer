import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ totalAnalysis: 0, avgScore: 0, totalUploads: 0 });

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/reports', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <span>{user?.name}</span>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Uploads</p>
            <p className="stat-value">{stats.totalUploads}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Analysis</p>
            <p className="stat-value">{stats.totalAnalysis}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Average Score</p>
            <p className="stat-value">{stats.avgScore}%</p>
          </div>
        </div>

        <section className="recent-reports">
          <div className="section-header">
            <h2>Recent Analysis</h2>
            <Link to="/upload" className="btn btn-primary">New Analysis</Link>
          </div>

          {reports.length > 0 ? (
            <div className="reports-table">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Score</th>
                    <th>Matching %</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id || report._id}>
                      <td>{report.jobTitle}</td>
                      <td><span className="score-badge">{report.score}</span></td>
                      <td>{report.matchingPercentage}%</td>
                      <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/report/${report.id || report._id}`} className="btn btn-secondary btn-sm">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No analysis yet. Start by uploading your resume!</p>
              <Link to="/upload" className="btn btn-primary">Upload Resume</Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
