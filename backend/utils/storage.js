const fs = require('fs');
const path = require('path');

const DATA_DIR = 'data';

const initStorage = () => {
  const files = ['users.json', 'reports.json'];
  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  });
};

const getUsers = () => {
  const data = fs.readFileSync(path.join(DATA_DIR, 'users.json'), 'utf8');
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
};

const findUser = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

const updateUser = (userId, updates) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
    return users[index];
  }
  return null;
};

const getReports = () => {
  const data = fs.readFileSync(path.join(DATA_DIR, 'reports.json'), 'utf8');
  return JSON.parse(data);
};

const saveReports = (reports) => {
  fs.writeFileSync(path.join(DATA_DIR, 'reports.json'), JSON.stringify(reports, null, 2));
};

const addReport = (report) => {
  const reports = getReports();
  reports.push(report);
  saveReports(reports);
};

const getReportById = (id) => {
  const reports = getReports();
  return reports.find(r => r.id === id);
};

const getUserReports = (userId) => {
  const reports = getReports();
  return reports.filter(r => r.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

initStorage();

module.exports = {
  getUsers,
  saveUsers,
  findUser,
  addUser,
  updateUser,
  getReports,
  saveReports,
  addReport,
  getReportById,
  getUserReports
};
