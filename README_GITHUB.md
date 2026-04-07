# Smart Resume Analyzer 🚀

An AI-powered web application that analyzes resumes against job descriptions, identifies skill gaps, and provides actionable improvement suggestions.

## Features ✨

- **User Authentication**: Secure signup/login with JWT tokens
- **Resume Upload**: Upload PDF resumes for analysis
- **AI Analysis**: Extract skills, experience, education, and projects
- **Job Matching**: Compare resume against job descriptions
- **Skill Gap Analysis**: Identify missing skills
- **Resume Scoring**: Get a score from 0-100
- **Matching Percentage**: See how well your resume matches the job
- **Suggestions**: Get actionable improvement recommendations
- **Reports**: Download detailed analysis reports
- **Dashboard**: View statistics and analysis history
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack 🛠️

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- No build process required
- Responsive design with CSS Grid/Flexbox
- Fetch API for HTTP requests

### Backend
- Node.js & Express.js
- JWT Authentication
- Bcrypt Password Hashing
- Multer for file uploads
- PDF-Parse for text extraction
- JSON file storage

## Quick Start 🚀

### Prerequisites
- Node.js (v14+)
- Python 3 (for serving frontend)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/smart-resume-analyzer.git
cd smart-resume-analyzer
```

2. **Setup Backend**
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend-simple
python -m http.server 8080
```
Frontend runs on `http://localhost:8080`

4. **Open the application**
```
http://localhost:8080
```

## Usage 📖

### 1. Create Account
- Click "Sign Up"
- Enter name, email, and password
- Click "Sign Up"

### 2. Upload Resume
- Click "New Analysis"
- Upload a PDF resume
- Paste a job description
- Click "Analyze Resume"

### 3. View Results
- See resume score (0-100)
- Check matching percentage
- View matched and missing skills
- Read improvement suggestions
- Download the report

## API Endpoints 📡

### Authentication
```
POST /api/auth/signup
POST /api/auth/login
```

### Analysis
```
POST /api/analyze
```

### Reports
```
GET /api/reports
GET /api/reports/:id
GET /api/reports/:id/download
```

### Statistics
```
GET /api/stats
```

## Project Structure 📁

```
smart-resume-analyzer/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── routes/
│   │   ├── auth.js
│   │   ├── analyze.js
│   │   ├── reports.js
│   │   └── stats.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── analyzer.js
│   ├── middleware/
│   │   └── auth.js
│   ├── data/
│   │   ├── users.json
│   │   └── reports.json
│   └── uploads/
│
├── frontend-simple/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── README.md
├── QUICK_START.txt
├── COMPLETE_GUIDE.md
└── .gitignore
```

## Configuration 🔧

### Backend Environment Variables (.env)
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Data Storage 💾

- **Users**: `backend/data/users.json`
- **Reports**: `backend/data/reports.json`
- **Uploads**: `backend/uploads/`

## Features in Detail 🎯

### Resume Analysis
- Extracts technical and professional skills
- Identifies work experience
- Recognizes educational qualifications
- Detects project mentions

### Job Matching
- Compares resume skills with job requirements
- Calculates matching percentage
- Identifies skill gaps
- Provides improvement suggestions

### Scoring Algorithm
- Based on skill matching (70%)
- Based on experience level (30%)
- Score range: 0-100

## Security 🔒

- Passwords hashed with bcrypt
- JWT token-based authentication
- CORS configured for localhost
- PDF file validation
- Input validation on all endpoints

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting 🐛

### Frontend not loading
- Clear browser cache
- Refresh page
- Check http://localhost:8080

### Backend errors
- Check terminal for error messages
- Verify port 5000 is available
- Restart backend: `npm start`

### PDF upload fails
- Ensure file is valid PDF
- Check file size (max 10MB)
- Verify backend has write permissions

### CORS errors
- Ensure backend is running on port 5000
- Check CORS is enabled in server.js
- Clear browser cache

## Future Enhancements 🚀

- [ ] MongoDB integration
- [ ] Advanced NLP for skill extraction
- [ ] Resume templates
- [ ] Batch analysis
- [ ] Email notifications
- [ ] User profile customization
- [ ] Resume version history
- [ ] Skill recommendations

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For issues or questions:
1. Check the documentation files
2. Review error messages in console
3. Check backend terminal output
4. Open an issue on GitHub

## Author ✍️

Created with ❤️ for job seekers everywhere

## Acknowledgments 🙏

- PDF-Parse for PDF text extraction
- Express.js for the web framework
- Bcrypt for secure password hashing

---

**Happy analyzing!** 🎉

For detailed setup instructions, see [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)
