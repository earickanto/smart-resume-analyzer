const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const { addReport } = require('../utils/storage');
const { analyzeResume, compareWithJobDescription } = require('../utils/analyzer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'));
    }
  }
});

router.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description required' });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    const resumeContent = analyzeResume(resumeText);
    const analysis = compareWithJobDescription(resumeContent, jobDescription);

    const jobTitleMatch = jobDescription.match(/(?:job title|position|role):\s*([^\n]+)/i);
    const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : 'Untitled Position';

    const report = {
      id: uuidv4(),
      userId: req.userId,
      jobTitle,
      jobDescription,
      resumeFile: req.file.filename,
      score: analysis.score,
      matchingPercentage: analysis.matchingPercentage,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      resumeContent,
      createdAt: new Date()
    };

    addReport(report);

    res.json({
      reportId: report.id,
      message: 'Analysis completed'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
