import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnalysisReport.css';

function AnalysisReport({ user, onLogout }) {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Report not found');
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportId}.txt`;
        a.click();
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading report...</div>;
  }

  if (error || !report) {
    return (
      <div className="report-page">
        <header className="dashboard-header">
          <h1>Analysis Report</h1>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </header>
        <div className="error-message">{error || 'Report not found'}</div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <header className="dashboard-header">
        <h1>Analysis Report</h1>
        <button className="btn btn-primary" onClick={handleDownload}>Download Report</button>
      </header>

      <main className="report-main">
        <div className="report-container">
          <div className="report-header">
            <div className="report-title">
              <h2>{report.jobTitle}</h2>
              <p>{new Date(report.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="score-circle">
              <span className="score-value">{report.score}</span>
              <span className="score-label">Score</span>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <p className="metric-label">Matching Percentage</p>
              <p className="metric-value">{report.matchingPercentage}%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${report.matchingPercentage}%` }}></div>
              </div>
            </div>

            <div className="metric-card">
              <p className="metric-label">Skills Matched</p>
              <p className="metric-value">{report.matchedSkills?.length || 0}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Missing Skills</p>
              <p className="metric-value">{report.missingSkills?.length || 0}</p>
            </div>
          </div>

          {report.matchedSkills && report.matchedSkills.length > 0 && (
            <div className="section">
              <h3>✓ Matched Skills ({report.matchedSkills.length})</h3>
              <div className="skills-list">
                {report.matchedSkills.map((skill, idx) => (
                  <span key={idx} className="skill-tag skill-matched">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {report.missingSkills && report.missingSkills.length > 0 && (
            <div className="section">
              <h3>✗ Missing Skills ({report.missingSkills.length})</h3>
              <div className="skills-list">
                {report.missingSkills.map((skill, idx) => (
                  <span key={idx} className="skill-tag skill-missing">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {report.suggestions && report.suggestions.length > 0 && (
            <div className="section">
              <h3>💡 Improvement Suggestions</h3>
              <div className="suggestions-list">
                {report.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="suggestion-item">
                    <span className="suggestion-number">{idx + 1}</span>
                    <p>{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section">
            <h3>Resume Content</h3>
            <div className="content-box">
              <h4>Skills</h4>
              <p>{report.resumeContent?.skills?.join(', ') || 'No skills found'}</p>
              
              <h4>Experience</h4>
              <p>{report.resumeContent?.experience?.join(', ') || 'No experience found'}</p>
              
              <h4>Education</h4>
              <p>{report.resumeContent?.education?.join(', ') || 'No education found'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnalysisReport;
