# Automatic GitHub Upload Guide

I've created automated scripts to upload your project to GitHub. Choose the method that works best for you.

---

## 🚀 Method 1: Automated Script (Easiest)

### For Windows Users

#### Option A: Using PowerShell (Recommended)
1. Open PowerShell as Administrator
2. Navigate to the app directory:
   ```powershell
   cd "path\to\app"
   ```
3. Run the script:
   ```powershell
   .\upload-to-github.ps1
   ```
4. Follow the prompts and enter your GitHub username

#### Option B: Using Command Prompt
1. Open Command Prompt
2. Navigate to the app directory:
   ```cmd
   cd path\to\app
   ```
3. Run the batch script:
   ```cmd
   upload-to-github.bat
   ```
4. Follow the prompts and enter your GitHub username

### For Mac/Linux Users
1. Open Terminal
2. Navigate to the app directory:
   ```bash
   cd path/to/app
   ```
3. Make the script executable:
   ```bash
   chmod +x upload-to-github.sh
   ```
4. Run the script:
   ```bash
   ./upload-to-github.sh
   ```

---

## 📋 Method 2: Manual Steps

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Enter repository name: `smart-resume-analyzer`
3. Add description: `AI-powered resume analyzer`
4. Choose "Public"
5. Click "Create repository"

### Step 2: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Upload Files
```bash
cd app
git init
git add .
git commit -m "Initial commit: Smart Resume Analyzer"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-resume-analyzer.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🔑 Authentication Methods

### Method A: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scope: `repo` (full control of private repositories)
4. Click "Generate token"
5. Copy the token
6. When prompted for password during `git push`, paste the token

### Method B: SSH Key

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to GitHub:
   - Go to Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key

3. Use SSH URL:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/smart-resume-analyzer.git
   ```

### Method C: GitHub CLI

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate:
   ```bash
   gh auth login
   ```
3. Create and push:
   ```bash
   gh repo create smart-resume-analyzer --source=. --remote=origin --push
   ```

---

## ✅ Verification

After upload, verify your files are on GitHub:

1. Go to https://github.com/YOUR_USERNAME/smart-resume-analyzer
2. You should see:
   - ✓ All folders (backend, frontend-simple)
   - ✓ All files (.gitignore, README.md, etc.)
   - ✓ Commit history

---

## 🐛 Troubleshooting

### "Git is not installed"
**Solution:** Download and install Git from https://git-scm.com/download/win

### "fatal: not a git repository"
**Solution:** Make sure you're in the `app` directory and run `git init` first

### "fatal: remote origin already exists"
**Solution:** Run `git remote remove origin` then add it again

### "Permission denied (publickey)"
**Solution:** Use HTTPS instead of SSH, or set up SSH keys properly

### "fatal: The current branch main has no upstream branch"
**Solution:** Run `git push -u origin main`

### "Authentication failed"
**Solution:** 
- Use a Personal Access Token instead of password
- Or use SSH keys
- Or use GitHub CLI

### "Repository not found"
**Solution:**
- Make sure the repository exists on GitHub
- Check the URL is correct
- Verify you have access to the repository

---

## 📝 After Upload

### 1. Update README
1. Go to your GitHub repository
2. Click the pencil icon on README.md
3. Replace content with content from `README_GITHUB.md`
4. Commit changes

### 2. Add License
1. Click "Add file" → "Create new file"
2. Name it `LICENSE`
3. Choose "MIT License" template
4. Commit

### 3. Add .gitignore
Already included! It will prevent uploading:
- node_modules/
- .env files
- Build artifacts
- OS files

### 4. Create Issues
1. Go to "Issues" tab
2. Click "New issue"
3. Add feature requests or bug reports

---

## 🔄 Future Updates

After initial upload, to push new changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 📚 Useful Git Commands

```bash
# Check status
git status

# View commit history
git log

# View changes
git diff

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branches
git merge feature-name

# Delete a branch
git branch -d branch-name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View remote URL
git remote -v

# Change remote URL
git remote set-url origin https://github.com/NEW_USERNAME/NEW_REPO.git
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Initialize repo | `git init` |
| Add files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push -u origin main` |
| Check status | `git status` |
| View history | `git log` |
| Create branch | `git checkout -b name` |
| Switch branch | `git checkout name` |
| Merge branch | `git merge name` |

---

## 🆘 Need Help?

- GitHub Docs: https://docs.github.com/
- Git Documentation: https://git-scm.com/doc
- GitHub CLI: https://cli.github.com/
- Stack Overflow: https://stackoverflow.com/questions/tagged/github

---

## ✨ You're All Set!

Your Smart Resume Analyzer project is ready to share with the world! 🚀

**Next Steps:**
1. Run the upload script
2. Verify files on GitHub
3. Update README
4. Share your repository
5. Celebrate! 🎉

---

**Happy coding!** 💻
