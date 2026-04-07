# Smart Resume Analyzer - GitHub Upload Script
# This script automatically uploads your project to GitHub

# Colors for output
$Green = 'Green'
$Red = 'Red'
$Yellow = 'Yellow'
$Cyan = 'Cyan'

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
Write-Host "║   Smart Resume Analyzer - GitHub Upload Script                ║" -ForegroundColor $Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking if Git is installed..." -ForegroundColor $Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor $Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor $Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor $Yellow
    exit 1
}

Write-Host ""
Write-Host "Please provide the following information:" -ForegroundColor $Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "✗ GitHub username is required!" -ForegroundColor $Red
    exit 1
}

# Get repository name
$repoName = Read-Host "Enter repository name (default: smart-resume-analyzer)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "smart-resume-analyzer"
}

Write-Host ""
Write-Host "Repository URL: https://github.com/$username/$repoName" -ForegroundColor $Cyan
Write-Host ""

# Confirm
$confirm = Read-Host "Is this correct? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Upload cancelled." -ForegroundColor $Yellow
    exit 0
}

Write-Host ""
Write-Host "Starting upload process..." -ForegroundColor $Cyan
Write-Host ""

# Initialize git
Write-Host "1. Initializing Git repository..." -ForegroundColor $Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to initialize Git" -ForegroundColor $Red
    exit 1
}
Write-Host "✓ Git repository initialized" -ForegroundColor $Green

# Add all files
Write-Host ""
Write-Host "2. Adding all files..." -ForegroundColor $Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to add files" -ForegroundColor $Red
    exit 1
}
Write-Host "✓ Files added" -ForegroundColor $Green

# Create commit
Write-Host ""
Write-Host "3. Creating initial commit..." -ForegroundColor $Yellow
git commit -m "Initial commit: Smart Resume Analyzer - AI-powered resume analysis tool"
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to create commit" -ForegroundColor $Red
    exit 1
}
Write-Host "✓ Commit created" -ForegroundColor $Green

# Rename branch
Write-Host ""
Write-Host "4. Setting up main branch..." -ForegroundColor $Yellow
git branch -M main
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to rename branch" -ForegroundColor $Red
    exit 1
}
Write-Host "✓ Branch set to main" -ForegroundColor $Green

# Add remote
Write-Host ""
Write-Host "5. Adding remote repository..." -ForegroundColor $Yellow
git remote add origin "https://github.com/$username/$repoName.git"
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to add remote" -ForegroundColor $Red
    exit 1
}
Write-Host "✓ Remote repository added" -ForegroundColor $Green

# Push to GitHub
Write-Host ""
Write-Host "6. Pushing to GitHub..." -ForegroundColor $Yellow
Write-Host "Note: You may be prompted to enter your GitHub credentials" -ForegroundColor $Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to push to GitHub" -ForegroundColor $Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor $Yellow
    Write-Host "1. Make sure the repository exists on GitHub" -ForegroundColor $Yellow
    Write-Host "2. Check your GitHub credentials" -ForegroundColor $Yellow
    Write-Host "3. Use a Personal Access Token instead of password" -ForegroundColor $Yellow
    Write-Host "   See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" -ForegroundColor $Yellow
    exit 1
}
Write-Host "✓ Successfully pushed to GitHub" -ForegroundColor $Green

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $Green
Write-Host "║   ✓ Upload Complete!                                          ║" -ForegroundColor $Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $Green
Write-Host ""
Write-Host "Your repository is now available at:" -ForegroundColor $Cyan
Write-Host "https://github.com/$username/$repoName" -ForegroundColor $Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor $Cyan
Write-Host "1. Visit your repository on GitHub" -ForegroundColor $Yellow
Write-Host "2. Update the README with content from README_GITHUB.md" -ForegroundColor $Yellow
Write-Host "3. Add a LICENSE file (MIT recommended)" -ForegroundColor $Yellow
Write-Host "4. Share your repository with others!" -ForegroundColor $Yellow
Write-Host ""
