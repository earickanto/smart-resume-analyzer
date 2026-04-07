const express = require('express');
const auth = require('../middleware/auth');
const { getUserReports, getReportById } = require('../utils/storage');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const reports = getUserReports(req.userId);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const report = getReportById(req.params.id);
    
    if (!report || report.userId !== req.userId) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/download', auth, async (req, res) => {
  try {
    const report = getReportById(req.params.id);
    
    if (!report || report.userId !== req.userId) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const reportContent = `
RESUME ANALYSIS REPORT
======================

Job Title: ${report.jobTitle}
Date: ${new Date(report.createdAt).toLocaleDateString()}

SCORE: ${report.score}/100
MATCHING PERCENTAGE: ${report.matchingPercentage}%

MATCHED SKILLS:
${report.matchedSkills.join(', ')}

MISSING SKILLS:
${report.missingSkills.join(', ')}

SUGGESTIONS:
${report.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

RESUME CONTENT:
Skills: ${report.resumeContent.skills.join(', ')}
Experience: ${report.resumeContent.experience.join(', ')}
Education: ${report.resumeContent.education.join(', ')}
    `;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="report-${report.id}.txt"`);
    res.send(reportContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
