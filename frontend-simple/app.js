const API_URL = 'http://localhost:5000/api';

let currentUser = null;
let currentPage = 'home';

const app = {
  init() {
    this.checkAuth();
    this.setupEventListeners();
    this.render();
  },

  checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      currentUser = JSON.parse(user);
      currentPage = 'dashboard';
    }
  },

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.dataset.page) {
        currentPage = e.target.dataset.page;
        this.render();
      }
      if (e.target.id === 'logout-btn') {
        this.logout();
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.id === 'signup-form') {
        e.preventDefault();
        this.handleSignup();
      }
      if (e.target.id === 'login-form') {
        e.preventDefault();
        this.handleLogin();
      }
      if (e.target.id === 'upload-form') {
        e.preventDefault();
        this.handleUpload();
      }
    });
  },

  async handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      console.log('Sending signup request:', { name, email });
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        alert('Signup failed: ' + (data.message || 'Unknown error'));
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      currentUser = data.user;
      currentPage = 'dashboard';
      this.render();
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error: ' + err.message);
    }
  },

  async handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      currentUser = data.user;
      currentPage = 'dashboard';
      this.render();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  },

  async handleUpload() {
    const resumeFile = document.getElementById('resume-file').files[0];
    const jobDescription = document.getElementById('job-description').value;

    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume and enter job description');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Analysis failed');
        return;
      }

      currentPage = `report-${data.reportId}`;
      this.render();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    currentPage = 'home';
    this.render();
  },

  render() {
    const app = document.getElementById('app');

    if (!currentUser) {
      if (currentPage === 'login') {
        app.innerHTML = this.renderLogin();
      } else if (currentPage === 'signup') {
        app.innerHTML = this.renderSignup();
      } else {
        app.innerHTML = this.renderHome();
      }
    } else {
      if (currentPage === 'dashboard') {
        app.innerHTML = this.renderDashboard();
      } else if (currentPage === 'upload') {
        app.innerHTML = this.renderUpload();
      } else if (currentPage.startsWith('report-')) {
        const reportId = currentPage.split('-')[1];
        this.renderReport(reportId);
      }
    }
  },

  renderHome() {
    return `
      <nav class="navbar">
        <div class="container navbar-content">
          <div class="logo">Resume Analyzer</div>
          <div class="nav-buttons">
            <button class="btn btn-secondary" data-page="login">Login</button>
            <button class="btn btn-primary" data-page="signup">Sign Up</button>
          </div>
        </div>
      </nav>

      <section class="hero">
        <div class="container hero-content">
          <div class="hero-text">
            <h1>Optimize Your Resume with AI</h1>
            <p>Get instant feedback on how well your resume matches job descriptions. Identify skill gaps and get actionable suggestions.</p>
            <div class="hero-buttons">
              <button class="btn btn-primary btn-large" data-page="signup">Get Started Free</button>
              <button class="btn btn-secondary btn-large">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2>Why Choose Resume Analyzer?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h3>Easy Upload</h3>
              <p>Upload your resume in PDF format and get instant analysis</p>
            </div>
            <div class="feature-card">
              <h3>AI-Powered Analysis</h3>
              <p>Advanced algorithms identify skills, experience, and education</p>
            </div>
            <div class="feature-card">
              <h3>Detailed Matching</h3>
              <p>Compare your resume against job descriptions with precision</p>
            </div>
            <div class="feature-card">
              <h3>Actionable Insights</h3>
              <p>Get specific suggestions to improve your resume</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p>&copy; 2024 Smart Resume Analyzer. All rights reserved.</p>
      </footer>
    `;
  },

  renderLogin() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-card">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
            <form id="login-form">
              <div class="input-group">
                <label>Email Address</label>
                <input type="email" id="login-email" placeholder="you@example.com" required>
              </div>
              <div class="input-group">
                <label>Password</label>
                <input type="password" id="login-password" placeholder="••••••••" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-large">Sign In</button>
            </form>
            <p class="auth-footer">
              Don't have an account? <a data-page="signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    `;
  },

  renderSignup() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-card">
            <h1>Create Account</h1>
            <p>Join us to optimize your resume</p>
            <form id="signup-form">
              <div class="input-group">
                <label>Full Name</label>
                <input type="text" id="signup-name" placeholder="John Doe" required>
              </div>
              <div class="input-group">
                <label>Email Address</label>
                <input type="email" id="signup-email" placeholder="you@example.com" required>
              </div>
              <div class="input-group">
                <label>Password</label>
                <input type="password" id="signup-password" placeholder="••••••••" required>
              </div>
              <div class="input-group">
                <label>Confirm Password</label>
                <input type="password" id="signup-confirm" placeholder="••••••••" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-large">Sign Up</button>
            </form>
            <p class="auth-footer">
              Already have an account? <a data-page="login">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    `;
  },

  async renderDashboard() {
    const token = localStorage.getItem('token');
    
    try {
      const statsRes = await fetch(`${API_URL}/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const stats = await statsRes.json();

      const reportsRes = await fetch(`${API_URL}/reports`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reports = await reportsRes.json();

      let reportsHTML = '';
      if (reports.length > 0) {
        reportsHTML = `
          <div class="reports-table">
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
                ${reports.slice(0, 5).map(r => `
                  <tr>
                    <td>${r.jobTitle}</td>
                    <td><span class="score-badge">${r.score}</span></td>
                    <td>${r.matchingPercentage}%</td>
                    <td>${new Date(r.createdAt).toLocaleDateString()}</td>
                    <td><button class="btn btn-secondary btn-sm" data-page="report-${r.id || r._id}">View</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else {
        reportsHTML = `
          <div class="empty-state">
            <p>No analysis yet. Start by uploading your resume!</p>
            <button class="btn btn-primary" data-page="upload">Upload Resume</button>
          </div>
        `;
      }

      return `
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <div class="header-actions">
            <span>${currentUser.name}</span>
            <button class="btn btn-secondary" id="logout-btn">Logout</button>
          </div>
        </div>

        <main class="dashboard-main">
          <div class="stats-grid">
            <div class="stat-card">
              <p class="stat-label">Total Uploads</p>
              <p class="stat-value">${stats.totalUploads}</p>
            </div>
            <div class="stat-card">
              <p class="stat-label">Total Analysis</p>
              <p class="stat-value">${stats.totalAnalysis}</p>
            </div>
            <div class="stat-card">
              <p class="stat-label">Average Score</p>
              <p class="stat-value">${stats.avgScore}%</p>
            </div>
          </div>

          <section class="recent-reports">
            <div class="section-header">
              <h2>Recent Analysis</h2>
              <button class="btn btn-primary" data-page="upload">New Analysis</button>
            </div>
            ${reportsHTML}
          </section>
        </main>
      `;
    } catch (err) {
      return `<div class="loading">Error loading dashboard</div>`;
    }
  },

  renderUpload() {
    return `
      <div class="dashboard-header">
        <h1>Upload Resume</h1>
        <button class="btn btn-secondary" id="logout-btn">Logout</button>
      </div>

      <main class="upload-main">
        <div class="upload-container">
          <form id="upload-form" class="upload-form">
            <div class="form-section">
              <h2>Resume Upload</h2>
              <div class="file-upload">
                <input type="file" id="resume-file" accept=".pdf" required>
                <label for="resume-file" class="file-upload-label">
                  <p>Click to upload or drag and drop</p>
                  <span>PDF files only (Max 10MB)</span>
                </label>
              </div>
            </div>

            <div class="form-section">
              <h2>Job Description</h2>
              <div class="input-group">
                <label>Paste the job description here</label>
                <textarea id="job-description" placeholder="Paste the complete job description..." rows="10" required></textarea>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-large">Analyze Resume</button>
          </form>
        </div>
      </main>
    `;
  },

  async renderReport(reportId) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/reports/${reportId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        document.getElementById('app').innerHTML = '<div class="loading">Report not found</div>';
        return;
      }

      const report = await response.json();

      document.getElementById('app').innerHTML = `
        <div class="dashboard-header">
          <h1>Analysis Report</h1>
          <button class="btn btn-secondary" id="logout-btn">Logout</button>
        </div>

        <main class="report-main">
          <div class="report-container">
            <div class="report-header">
              <div class="report-title">
                <h2>${report.jobTitle}</h2>
                <p>${new Date(report.createdAt).toLocaleDateString()}</p>
              </div>
              <div class="score-circle">
                <span class="score-value">${report.score}</span>
                <span class="score-label">Score</span>
              </div>
            </div>

            <div class="metrics-grid">
              <div class="metric-card">
                <p class="stat-label">Matching Percentage</p>
                <p class="metric-value">${report.matchingPercentage}%</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${report.matchingPercentage}%"></div>
                </div>
              </div>
              <div class="metric-card">
                <p class="stat-label">Skills Matched</p>
                <p class="metric-value">${report.matchedSkills?.length || 0}</p>
              </div>
              <div class="metric-card">
                <p class="stat-label">Missing Skills</p>
                <p class="metric-value">${report.missingSkills?.length || 0}</p>
              </div>
            </div>

            ${report.matchedSkills && report.matchedSkills.length > 0 ? `
              <div class="section">
                <h3>✓ Matched Skills (${report.matchedSkills.length})</h3>
                <div class="skills-list">
                  ${report.matchedSkills.map(s => `<span class="skill-tag skill-matched">${s}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${report.missingSkills && report.missingSkills.length > 0 ? `
              <div class="section">
                <h3>✗ Missing Skills (${report.missingSkills.length})</h3>
                <div class="skills-list">
                  ${report.missingSkills.map(s => `<span class="skill-tag skill-missing">${s}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${report.suggestions && report.suggestions.length > 0 ? `
              <div class="section">
                <h3>💡 Improvement Suggestions</h3>
                <div class="suggestions-list">
                  ${report.suggestions.map((s, i) => `
                    <div class="suggestion-item">
                      <span class="suggestion-number">${i + 1}</span>
                      <p>${s}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="section">
              <h3>Resume Content</h3>
              <div class="content-box">
                <h4>Skills</h4>
                <p>${report.resumeContent?.skills?.join(', ') || 'No skills found'}</p>
                <h4>Experience</h4>
                <p>${report.resumeContent?.experience?.join(', ') || 'No experience found'}</p>
                <h4>Education</h4>
                <p>${report.resumeContent?.education?.join(', ') || 'No education found'}</p>
              </div>
            </div>

            <button class="btn btn-primary" onclick="window.location.href='${API_URL}/reports/${reportId}/download'">Download Report</button>
          </div>
        </main>
      `;

      document.getElementById('logout-btn').addEventListener('click', () => {
        app.logout();
      });
    } catch (err) {
      document.getElementById('app').innerHTML = '<div class="loading">Error loading report</div>';
    }
  }
};

app.init();
