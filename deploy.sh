#!/bin/bash
set -e

# ─── Configure these ───────────────────────────────────────────────
SSH_USER="your_user"          # e.g. ubuntu, root, debian
SSH_HOST="your.server.ip"     # e.g. 51.210.x.x or yourdomain.com
APP_DIR="/var/www/pianist"    # path on the server
# ───────────────────────────────────────────────────────────────────

echo "Deploying to $SSH_USER@$SSH_HOST..."

ssh "$SSH_USER@$SSH_HOST" << EOF
  set -e
  cd $APP_DIR
  git pull origin master
  cd frontend && npm install --silent && npm run build
  pm2 restart pianist
  echo "Deploy complete."
EOF
