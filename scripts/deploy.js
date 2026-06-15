const SftpClient = require('ssh2-sftp-client')
const path = require('path')
const readline = require('readline')

const SFTP_USER = 'tomaszz'
const SFTP_HOST = 'ftp.cluster130.hosting.ovh.net'
const SFTP_PORT = 22
const REMOTE_DIR = '/home/tomaszz/www'
const LOCAL_DIR = path.join(__dirname, '../frontend/dist')

function askPassword() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.stdoutMuted = true
    rl.question(`Password for ${SFTP_USER}@${SFTP_HOST}: `, (password) => {
      rl.close()
      process.stdout.write('\n')
      resolve(password)
    })
    rl._writeToOutput = (s) => { if (rl.stdoutMuted) process.stdout.write('*') }
  })
}

async function main() {
  const password = await askPassword()
  const sftp = new SftpClient()

  try {
    console.log('Connecting...')
    await sftp.connect({ host: SFTP_HOST, port: SFTP_PORT, username: SFTP_USER, password })
    console.log('Uploading files...')
    await sftp.uploadDir(LOCAL_DIR, REMOTE_DIR)
    console.log('\nDeploy complete! https://tomasz-domanski.com')
  } finally {
    await sftp.end()
  }
}

main().catch((err) => { console.error('Deploy failed:', err.message); process.exit(1) })
