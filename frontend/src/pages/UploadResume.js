import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadResume.css';

function UploadResume({ user, onLogout }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setError('');
    } else {
      setError('Please upload a PDF file');
      setResume(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resume || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed');
      }

      setSuccess('Analysis completed successfully!');
      setResume(null);
      setJobDescription('');
      setTimeout(() => {
        navigate(`/report/${data.reportId}`);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <header className="dashboard-header">
        <h1>Upload Resume</h1>
        <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
      </header>

      <main className="upload-main">
        <div className="upload-container">
          <form onSubmit={handleSubmit} className="upload-form">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="form-section">
              <h2>Resume Upload</h2>
              <div className="file-upload">
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  disabled={loading}
                />
                <label htmlFor="resume-input" className="file-upload-label">
                  <p>Click to upload or drag and drop</p>
                  <span>PDF files only (Max 10MB)</span>
                </label>
                {resume && <div className="file-selected">✓ {resume.name}</div>}
              </div>
            </div>

            <div className="form-section">
              <h2>Job Description</h2>
              <div className="input-group">
                <label>Paste the job description here</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description..."
                  rows="10"
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UploadResume;
