# Git Workflow Guide

A simple and practical guide for managing your investment tracker project with Git.

## 🚀 Quick Start Commands

### Daily Workflow
```bash
# Check current status
git status

# Pull latest changes from remote
git pull origin main

# Make your changes, then stage them
git add .

# Commit with a descriptive message
git commit -m "Add new investment tracking feature"

# Push to remote repository
git push origin main
```

## 📋 Essential Git Commands

### Repository Setup
```bash
# Clone an existing repository
git clone https://github.com/username/investment-tracker.git

# Initialize a new repository
git init

# Add remote repository
git remote add origin https://github.com/username/investment-tracker.git
```

### Basic Workflow
```bash
# Check repository status
git status

# View changes in files
git diff

# Stage specific files
git add filename.js
git add docs/
git add .

# Commit changes
git commit -m "Descriptive commit message"

# View commit history
git log --oneline

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

### Branch Management
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch between branches
git checkout main
git checkout feature/new-feature

# List all branches
git branch

# Merge branch into main
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## 🔄 Common Workflows

### 1. Daily Development Workflow
```bash
# Start your day
git pull origin main

# Make changes to your code
# ... edit files ...

# Check what changed
git status
git diff

# Stage and commit
git add .
git commit -m "Update portfolio calculations"

# Push changes
git push origin main
```

### 2. Feature Development Workflow
```bash
# Create feature branch
git checkout -b feature/wealthsimple-integration

# Make your changes
# ... develop feature ...

# Commit frequently
git add .
git commit -m "Add Wealthsimple login functionality"

# Push feature branch
git push origin feature/wealthsimple-integration

# Switch back to main and merge
git checkout main
git pull origin main
git merge feature/wealthsimple-integration
git push origin main

# Clean up
git branch -d feature/wealthsimple-integration
```

### 3. Bug Fix Workflow
```bash
# Create bug fix branch
git checkout -b bugfix/fix-stock-price-api

# Fix the issue
# ... make fixes ...

# Test your fix
# ... run tests ...

# Commit fix
git add .
git commit -m "Fix stock price API timeout issue"

# Push and merge
git push origin bugfix/fix-stock-price-api
git checkout main
git merge bugfix/fix-stock-price-api
git push origin main
```

## 📝 Commit Message Best Practices

### Good Commit Messages
```bash
git commit -m "Add Google Sheets API integration"
git commit -m "Fix Wealthsimple login selector"
git commit -m "Update portfolio calculation formulas"
git commit -m "Add error handling for API failures"
git commit -m "Update documentation for setup process"
```

### Commit Message Format
```
Type: Brief description

Examples:
- feat: Add new investment tracking feature
- fix: Resolve stock price API timeout
- docs: Update setup guide instructions
- refactor: Simplify portfolio calculation logic
- test: Add unit tests for API functions
```

## 🔧 Useful Git Commands

### Viewing History
```bash
# View commit history
git log

# View history with file changes
git log --stat

# View history in one line per commit
git log --oneline

# View changes in last commit
git show
```

### Undoing Changes
```bash
# Undo changes in working directory
git checkout -- filename.js

# Unstage files
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Stashing Changes
```bash
# Save current changes temporarily
git stash

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

## 🚨 Emergency Commands

### When Things Go Wrong
```bash
# Discard all local changes
git reset --hard HEAD

# Force pull from remote (overwrites local)
git fetch origin
git reset --hard origin/main

# Recover deleted files
git checkout HEAD -- filename.js

# Find lost commits
git reflog
```

## 🔐 GitHub Integration

### Working with GitHub
```bash
# Fork and clone workflow
git clone https://github.com/your-username/investment-tracker.git
cd investment-tracker

# Add upstream remote
git remote add upstream https://github.com/original-owner/investment-tracker.git

# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Pull Request Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to your fork
git push origin feature/your-feature

# Create pull request on GitHub
# After approval, merge and clean up
git checkout main
git pull origin main
git branch -d feature/your-feature
```

## 📁 Project-Specific Workflow

### For Investment Tracker Project
```bash
# Daily automation updates
git pull origin main
# GitHub Actions will handle automated updates

# Manual script updates
git add scripts/update-sheets.js
git commit -m "Update automation script for new API"
git push origin main

# Documentation updates
git add docs/
git commit -m "Update setup guide with new instructions"
git push origin main

# Configuration changes
git add .github/workflows/
git commit -m "Update GitHub Actions workflow"
git push origin main
```

## 🎯 Best Practices

### Do's
- ✅ Commit frequently with descriptive messages
- ✅ Pull before starting work
- ✅ Use branches for features and bug fixes
- ✅ Test before pushing to main
- ✅ Keep commits focused and atomic
- ✅ Write clear commit messages

### Don'ts
- ❌ Commit directly to main for features
- ❌ Commit sensitive data (passwords, API keys)
- ❌ Force push to shared branches
- ❌ Leave merge conflicts unresolved
- ❌ Commit without testing
- ❌ Use vague commit messages

## 🔍 Troubleshooting

### Common Issues
```bash
# Merge conflicts
git status  # See conflicted files
# Edit files to resolve conflicts
git add resolved-file.js
git commit -m "Resolve merge conflict"

# Detached HEAD state
git checkout main

# Wrong branch
git checkout correct-branch-name

# Accidentally deleted files
git checkout HEAD -- deleted-file.js
```

### Getting Help
```bash
# Get help for any command
git help command-name
git command-name --help

# View Git configuration
git config --list

# Set up user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📚 Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Remember**: Git is a powerful tool, but start simple. Master the basic workflow first, then gradually learn advanced features as you need them.
