#!/usr/bin/env node

/**
 * LunaraX Form Setup Helper
 * Run this after npm install to configure your environment
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('\n🚀 LunaraX Form Backend Setup\n');
  console.log('This will help you configure the environment variables.\n');

  const envPath = path.join(__dirname, '.env');
  
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('\n📊 Google Sheets Configuration\n');
  const sheetsId = await question('Google Sheets ID (from URL): ');
  const tabName = await question('Tab name (default: Formlar): ') || 'Formlar';
  const serviceEmail = await question('Service Account Email: ');
  console.log('\nPaste the entire private key (including BEGIN/END lines):');
  const privateKey = await question('> ');

  console.log('\n📧 SMTP Email Configuration\n');
  const smtpHost = await question('SMTP Host (e.g., smtp.gmail.com): ');
  const smtpPort = await question('SMTP Port (587 or 465): ');
  const smtpUser = await question('SMTP Username/Email: ');
  const smtpPass = await question('SMTP Password/App Password: ');
  const emailTo = await question('Recipient Email (default: info@hilunarax.co): ') || 'info@hilunarax.co';
  const emailFrom = await question('Sender Email (default: Lunarax Form <no-reply@hilunarax.co>): ') || 'Lunarax Form <no-reply@hilunarax.co>';

  const envContent = `# Google Sheets Configuration
GOOGLE_SHEETS_ID=${sheetsId}
GOOGLE_SHEETS_TAB_NAME=${tabName}
GOOGLE_SERVICE_ACCOUNT_EMAIL=${serviceEmail}
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="${privateKey}"

# SMTP Email Configuration
SMTP_HOST=${smtpHost}
SMTP_PORT=${smtpPort}
SMTP_USER=${smtpUser}
SMTP_PASS=${smtpPass}
EMAIL_TO=${emailTo}
EMAIL_FROM=${emailFrom}
`;

  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Environment file created successfully!\n');
  console.log('Next steps:');
  console.log('1. Verify .env file contents');
  console.log('2. Share your Google Sheet with the service account email');
  console.log('3. Add header row to your Google Sheet (see README.md)');
  console.log('4. Run: npm run dev');
  console.log('5. Test the form at: http://localhost:3000/firmanizi-taniyalim.html\n');

  rl.close();
}

setup().catch((error) => {
  console.error('Setup failed:', error);
  rl.close();
  process.exit(1);
});
