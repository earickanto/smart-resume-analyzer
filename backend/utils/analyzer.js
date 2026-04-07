const commonSkills = [
  'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust',
  'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
  'mongodb', 'mysql', 'postgresql', 'redis',
  'aws', 'azure', 'docker', 'kubernetes',
  'git', 'linux', 'html', 'css', 'sql', 'api', 'rest', 'graphql'
];

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();
  const found = new Set();
  commonSkills.forEach(skill => {
    if (lowerText.includes(skill)) found.add(skill);
  });
  return Array.from(found);
};

const extractExperience = (text) => {
  const experiences = [];
  const lines = text.split('\n');
  lines.forEach(line => {
    if (line.match(/\d+\s*(years?|yrs?)/i) || line.match(/senior|junior|lead|manager|developer|engineer/i)) {
      experiences.push(line.trim());
    }
  });
  return experiences.slice(0, 5);
};

const extractEducation = (text) => {
  const education = [];
  const degrees = ['bachelor', 'master', 'phd', 'diploma', 'b.s', 'b.a', 'm.s'];
  const lines = text.split('\n');
  lines.forEach(line => {
    if (degrees.some(degree => line.toLowerCase().includes(degree))) {
      education.push(line.trim());
    }
  });
  return education.slice(0, 5);
};

const analyzeResume = (resumeText) => {
  return {
    skills: extractSkills(resumeText),
    experience: extractExperience(resumeText),
    education: extractEducation(resumeText),
    projects: []
  };
};

const compareWithJobDescription = (resumeContent, jobDescription) => {
  const jobSkills = extractSkills(jobDescription);
  const resumeSkills = resumeContent.skills;
  
  const matchedSkills = resumeSkills.filter(skill => jobSkills.includes(skill));
  const missingSkills = jobSkills.filter(skill => !resumeSkills.includes(skill));
  
  const matchingPercentage = jobSkills.length > 0 
    ? Math.round((matchedSkills.length / jobSkills.length) * 100)
    : 0;
  
  const score = Math.round(matchingPercentage * 0.7 + (resumeContent.experience.length * 5));
  
  const suggestions = [
    missingSkills.length > 0 ? `Add skills: ${missingSkills.slice(0, 3).join(', ')}` : 'Great skill match!',
    resumeContent.experience.length === 0 ? 'Add work experience section' : 'Highlight your experience',
    resumeContent.education.length === 0 ? 'Include educational background' : 'Emphasize relevant education',
    'Use action verbs in descriptions',
    'Tailor resume to job keywords'
  ];
  
  return {
    score: Math.min(score, 100),
    matchingPercentage,
    matchedSkills,
    missingSkills,
    suggestions: suggestions.slice(0, 5)
  };
};

module.exports = {
  analyzeResume,
  compareWithJobDescription,
  extractSkills
};
