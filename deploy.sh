#!/bin/bash
# ================================================
# Senties Bakers - One-Click GitHub Deploy Script
# Run this from Git Bash inside the senties-bakers folder
# ================================================

echo ""
echo "============================================"
echo " SENTIES BAKERS - GitHub Deploy Script"
echo "============================================"
echo ""

# Ask for GitHub credentials
read -p "Enter your GitHub username: " GH_USER
read -s -p "Enter your GitHub Personal Access Token: " GH_TOKEN
echo ""
echo ""

REPO="sentiesbakers"
REMOTE_URL="https://${GH_USER}:${GH_TOKEN}@github.com/${GH_USER}/${REPO}.git"

echo ">>> Step 1: Initializing git repo..."
git init
git config user.email "deploy@sentiesbakers.com"
git config user.name "Senties Deploy"

echo ">>> Step 2: Setting up remote..."
git remote remove origin 2>/dev/null
git remote add origin "$REMOTE_URL"

echo ">>> Step 3: Staging all files..."
git add .

echo ">>> Step 4: Creating commit..."
git commit -m "Deploy Senties Bakers - Full site with all assets"

echo ">>> Step 5: Pushing to GitHub..."
git branch -M main
git push -u origin main --force

if [ $? -ne 0 ]; then
  echo ""
  echo "ERROR: Push failed. Check your username/token and try again."
  exit 1
fi

echo ""
echo ">>> Step 6: Enabling GitHub Pages via API..."
curl -s -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  "https://api.github.com/repos/${GH_USER}/${REPO}/pages" \
  -d '{"source":{"branch":"main","path":"/"}}' \
  > /tmp/pages_response.json 2>&1

# Check if Pages was enabled
PAGES_URL=$(cat /tmp/pages_response.json | grep -o '"html_url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$PAGES_URL" ]; then
  # Try updating existing Pages config instead
  curl -s -X PUT \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GH_TOKEN}" \
    "https://api.github.com/repos/${GH_USER}/${REPO}/pages" \
    -d '{"source":{"branch":"main","path":"/"}}' \
    > /tmp/pages_response2.json 2>&1
  PAGES_URL="https://${GH_USER}.github.io/${REPO}/"
fi

echo ""
echo "============================================"
echo " DEPLOY COMPLETE!"
echo "============================================"
echo ""
echo " Your site will be live in ~2 minutes at:"
echo " https://${GH_USER}.github.io/${REPO}/"
echo ""
echo " GitHub Repo:"
echo " https://github.com/${GH_USER}/${REPO}"
echo "============================================"
echo ""
