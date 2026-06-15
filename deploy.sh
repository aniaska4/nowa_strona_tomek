#!/bin/bash
set -e

# ─── OVH shared hosting (frontend) ────────────────────────────────
SFTP_USER="tomaszz"
SFTP_HOST="ftp.cluster130.hosting.ovh.net"
SFTP_PORT="22"
REMOTE_DIR="/home/tomaszz/www"
# ──────────────────────────────────────────────────────────────────

echo "Building frontend..."
cd frontend
npm install --silent
npm run build
cd ..

echo "Uploading to OVH..."
node scripts/deploy.js
