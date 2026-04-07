import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">Resume Analyzer</div>
          <div className="nav-buttons">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Optimize Your Resume with AI</h1>
            <p>Get instant feedback on how well your resume matches job descriptions. Identify skill gaps and get actionable suggestions.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">Get Started Free</Link>
              <button className="btn btn-secondary btn-large">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Resume Analyzer?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy Upload</h3>
              <p>Upload your resume in PDF format and get instant analysis</p>
            </div>
            <div className="feature-card">
              <h3>AI-Powered Analysis</h3>
              <p>Advanced algorithms identify skills, experience, and education</p>
            </div>
            <div className="feature-card">
              <h3>Detailed Matching</h3>
              <p>Compare your resume against job descriptions with precision</p>
            </div>
            <div className="feature-card">
              <h3>Actionable Insights</h3>
              <p>Get specific suggestions to improve your resume</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Smart Resume Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
