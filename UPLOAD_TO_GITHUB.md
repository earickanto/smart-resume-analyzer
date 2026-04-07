# Upload to GitHub - Step by Step Guide

## Prerequisites
- Git installed on your computer
- GitHub account
- GitHub Personal Access Token (for authentication)

## Step 1: Install Git (if not already installed)

### Windows
Download from: https://git-scm.com/download/win
Run the installer and follow the prompts

### Mac
```bash
brew install git
```

### Linux
```bash
sudo apt-get install git
```

## Step 2: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `smart-resume-analyzer`
3. Description: `AI-powered resume analyzer that matches resumes against job descriptions`
4. Choose "Public" (so others can see it)
5. Click "Create repository"

## Step 3: Configure Git (First Time Only)

Open Command Prompt or PowerShell and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Upload Files to GitHub

Navigate to the app directory and run these commands:

```bash
cd app

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Smart Resume Analyzer - AI-powered resume analysis tool"

# Rename branch to main
git branch -M main

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smart-resume-analyzer.git

# Push to GitHub
git push -u origin main
```

## Step 5: Verify Upload

1. Go to https://github.com/YOUR_USERNAME/smart-resume-analyzer
2. You should see all your files uploaded

## If You Get Authentication Error

### Option A: Use Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scopes: `repo` (full control of private repositories)
4. Click "Generate token"
5. Copy the token

When pushing, use:
```bash
git push -u origin main
```

When prompted for password, paste the token instead.

### Option B: Use SSH Key

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

2. Add to GitHub: Settings → SSH and GPG keys → New SSH key

3. Use SSH URL instead:
```bash
git remote add origin git@github.com:YOUR_USERNAME/smart-resume-analyzer.git
```

## Complete Commands (Copy & Paste)

```bash
cd app
git init
git add .
git commit -m "Initial commit: Smart Resume Analyzer - AI-powered resume analysis tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-resume-analyzer.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## After Upload - Update README

1. Go to your GitHub repository
2. Click "Edit" on the README
3. Replace the content with the content from `README_GITHUB.md`

## Troubleshooting

### "fatal: not a git repository"
- Make sure you're in the `app` directory
- Run `git init` first

### "fatal: remote origin already exists"
- Run: `git remote remove origin`
- Then add the remote again

### "Permission denied (publickey)"
- Use HTTPS instead of SSH
- Or set up SSH keys properly

### "fatal: The current branch main has no upstream branch"
- Run: `git push -u origin main`

## Next Steps

After uploading:
1. Add a LICENSE file (MIT recommended)
2. Create GitHub Issues for features
3. Add GitHub Actions for CI/CD
4. Create a CONTRIBUTING.md file
5. Add badges to README

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log

# Make changes and commit
git add .
git commit -m "Your message"
git push

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Delete a branch
git branch -d branch-name
```

---

**Need help?** Check GitHub's documentation: https://docs.github.com/en/get-started
