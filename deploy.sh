#!/bin/bash
set -e

# ─── OVH shared hosting (frontend) ────────────────────────────────
SFTP_USER="tomaszz"
SFTP_HOST="ftp.cluster130.hosting.ovh.net"
SFTP_PORT="22"
REMOTE_DIR="/home/tomaszz/www"   # web root on OVH
# ──────────────────────────────────────────────────────────────────

echo "Building frontend..."
cd frontend
npm install --silent
npm run build
cd ..

echo "Uploading to OVH..."
rsync -avz --delete -e "ssh -p $SFTP_PORT" frontend/dist/ "$SFTP_USER@$SFTP_HOST:$REMOTE_DIR/"

echo "Deploy complete! Site is live at https://tomasz-domanski.com"
