# Smart Resume Analyzer

A complete web application for analyzing resumes against job descriptions with AI-powered insights.

## Project Structure

```
app/
├── frontend/          # React frontend
├── backend/           # Node.js backend
└── README.md
```

## Getting Started

### Backend Setup

1. Navigate to backend directory:
```bash
cd app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Features

✅ User Authentication (Signup/Login with JWT)
✅ Resume PDF Upload
✅ AI-Powered Resume Analysis
✅ Job Description Matching
✅ Skill Gap Identification
✅ Resume Scoring (0-100)
✅ Matching Percentage
✅ Improvement Suggestions
✅ Downloadable Reports
✅ Responsive Design
✅ Dashboard with Statistics

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Analysis
- `POST /api/analyze` - Upload resume and analyze (requires auth)

### Reports
- `GET /api/reports` - Get all user reports (requires auth)
- `GET /api/reports/:id` - Get specific report (requires auth)
- `GET /api/reports/:id/download` - Download report (requires auth)

### Statistics
- `GET /api/stats` - Get user statistics (requires auth)

## Technologies Used

### Frontend
- React 18
- React Router v6
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt Password Hashing
- PDF Parse
- Multer File Upload

## Storage

- User data: `data/users.json`
- Reports: `data/reports.json`
- Uploaded files: `uploads/` directory

## Test Credentials

After signup, you can use any email/password combination to test the application.

## Notes

- Backend must be running before frontend can make API calls
- Ensure both ports (3000 and 5000) are available
- PDF files are temporarily stored in the `uploads/` directory
- User data and reports are stored in JSON files in the `data/` directory
