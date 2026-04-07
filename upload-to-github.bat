@echo off
REM Smart Resume Analyzer - GitHub Upload Script
REM This script automatically uploads your project to GitHub

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════════════
echo    Smart Resume Analyzer - GitHub Upload Script
echo ════════════════════════════════════════════════════════════════
echo.

REM Check if Git is installed
echo Checking if Git is installed...
git --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo Git found!
echo.

REM Get GitHub username
set /p username="Enter your GitHub username: "
if "!username!"=="" (
    echo ERROR: GitHub username is required!
    pause
    exit /b 1
)

REM Get repository name
set /p repoName="Enter repository name (default: smart-resume-analyzer): "
if "!repoName!"=="" (
    set repoName=smart-resume-analyzer
)

echo.
echo Repository URL: https://github.com/!username!/!repoName!
echo.

REM Confirm
set /p confirm="Is this correct? (yes/no): "
if /i not "!confirm!"=="yes" (
    echo Upload cancelled.
    pause
    exit /b 0
)

echo.
echo Starting upload process...
echo.

REM Initialize git
echo 1. Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Failed to initialize Git
    pause
    exit /b 1
)
echo Git repository initialized
echo.

REM Add all files
echo 2. Adding all files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo Files added
echo.

REM Create commit
echo 3. Creating initial commit...
git commit -m "Initial commit: Smart Resume Analyzer - AI-powered resume analysis tool"
if errorlevel 1 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo Commit created
echo.

REM Rename branch
echo 4. Setting up main branch...
git branch -M main
if errorlevel 1 (
    echo ERROR: Failed to rename branch
    pause
    exit /b 1
)
echo Branch set to main
echo.

REM Add remote
echo 5. Adding remote repository...
git remote add origin https://github.com/!username!/!repoName!.git
if errorlevel 1 (
    echo ERROR: Failed to add remote
    pause
    exit /b 1
)
echo Remote repository added
echo.

REM Push to GitHub
echo 6. Pushing to GitHub...
echo Note: You may be prompted to enter your GitHub credentials
git push -u origin main
if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo.
    echo Troubleshooting:
    echo 1. Make sure the repository exists on GitHub
    echo 2. Check your GitHub credentials
    echo 3. Use a Personal Access Token instead of password
    echo    See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
    echo.
    pause
    exit /b 1
)
echo Successfully pushed to GitHub
echo.

echo ════════════════════════════════════════════════════════════════
echo    Upload Complete!
echo ════════════════════════════════════════════════════════════════
echo.
echo Your repository is now available at:
echo https://github.com/!username!/!repoName!
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Update the README with content from README_GITHUB.md
echo 3. Add a LICENSE file (MIT recommended)
echo 4. Share your repository with others!
echo.
pause
