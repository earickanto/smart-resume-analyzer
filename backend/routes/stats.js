const express = require('express');
const auth = require('../middleware/auth');
const { getUserReports } = require('../utils/storage');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const reports = getUserReports(req.userId);

    const totalAnalysis = reports.length;
    const totalUploads = reports.length;
    const avgScore = reports.length > 0 
      ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length)
      : 0;

    res.json({
      totalAnalysis,
      totalUploads,
      avgScore
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
