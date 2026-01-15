/**
 * SMTP Connection Test Script
 * Run with: node test-email.js
 *
 * This script tests the Zoho SMTP connection independently of Next.js
 * to isolate whether the 535 error is from Zoho or Next.js environment.
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Parse .env.local file manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    console.log('   Expected location:', envPath);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};

  envContent.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.startsWith('#') || !line.trim()) return;

    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      // Remove quotes if present
      let value = valueParts.join('=').trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      env[key.trim()] = value;
    }
  });

  return env;
}

async function testSMTPConnection() {
  console.log('\n🔧 SMTP Connection Test for Zoho Mail\n');
  console.log('='.repeat(50));

  // Load environment variables
  const env = loadEnvFile();

  // Display loaded credentials (masked)
  console.log('\n📋 Loaded Configuration:');
  console.log('   SMTP_USER:', env.SMTP_USER || '❌ NOT SET');
  console.log('   SMTP_PASSWORD:', env.SMTP_PASSWORD ? '✓ SET (' + env.SMTP_PASSWORD.length + ' chars)' : '❌ NOT SET');
  console.log('   EMAIL_FROM:', env.EMAIL_FROM || '❌ NOT SET');
  console.log('   EMAIL_TO_PROVIDER:', env.EMAIL_TO_PROVIDER || '❌ NOT SET');

  // Validate required variables
  if (!env.SMTP_USER || !env.SMTP_PASSWORD) {
    console.error('\n❌ Missing required environment variables!');
    console.log('   Please ensure SMTP_USER and SMTP_PASSWORD are set in .env.local');
    process.exit(1);
  }

  // Create transporter with exact same settings as the API route
  const transporterConfig = {
    host: 'smtppro.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
    // Additional debug options
    debug: true,
    logger: true,
  };

  console.log('\n🔌 SMTP Settings:');
  console.log('   Host:', transporterConfig.host);
  console.log('   Port:', transporterConfig.port);
  console.log('   Secure (SSL):', transporterConfig.secure);
  console.log('   Auth User:', transporterConfig.auth.user);

  console.log('\n⏳ Attempting connection to Zoho SMTP...\n');

  try {
    const transporter = nodemailer.createTransport(transporterConfig);

    // Verify connection
    await transporter.verify();

    console.log('='.repeat(50));
    console.log('✅ SUCCESS! SMTP connection verified.');
    console.log('='.repeat(50));
    console.log('\n   The credentials are working correctly.');
    console.log('   The issue is likely in the Next.js environment resolution.');
    console.log('\n   Next steps:');
    console.log('   1. Restart the Next.js dev server');
    console.log('   2. Clear the .next cache: rm -rf .next');
    console.log('   3. Check that .env.local is in the project root\n');

    // Optional: Send a test email
    const sendTest = process.argv.includes('--send');
    if (sendTest && env.EMAIL_FROM && env.EMAIL_TO_PROVIDER) {
      console.log('📧 Sending test email...');

      const info = await transporter.sendMail({
        from: `"Test Script" <${env.EMAIL_FROM}>`,
        to: env.EMAIL_TO_PROVIDER,
        subject: 'SMTP Test - Apen y Asociados',
        text: 'This is a test email from the SMTP test script.',
        html: '<p>This is a <strong>test email</strong> from the SMTP test script.</p>',
      });

      console.log('✅ Test email sent! Message ID:', info.messageId);
    } else if (!sendTest) {
      console.log('💡 Tip: Run with --send flag to also send a test email:');
      console.log('   node test-email.js --send\n');
    }

  } catch (error) {
    console.log('='.repeat(50));
    console.log('❌ CONNECTION FAILED');
    console.log('='.repeat(50));
    console.log('\nError details:');
    console.log('   Code:', error.code || 'N/A');
    console.log('   Message:', error.message);

    if (error.responseCode === 535) {
      console.log('\n🔐 535 Authentication Error - Troubleshooting:');
      console.log('');
      console.log('   1. VERIFY APP PASSWORD:');
      console.log('      - Go to: https://accounts.zoho.com/home');
      console.log('      - Security → App Passwords');
      console.log('      - Generate a NEW app password for "Mail"');
      console.log('      - Copy it EXACTLY (no spaces) to .env.local');
      console.log('');
      console.log('   2. CHECK SMTP ACCESS:');
      console.log('      - Go to: https://mail.zoho.com');
      console.log('      - Settings (gear icon) → Mail Accounts');
      console.log('      - Select: noreply@apenyasociados.com');
      console.log('      - Ensure "SMTP Access" is ENABLED');
      console.log('');
      console.log('   3. VERIFY ACCOUNT TYPE:');
      console.log('      - smtppro.zoho.com requires Zoho Workplace/Organization');
      console.log('      - Free Zoho Mail accounts use: smtp.zoho.com');
      console.log('');
      console.log('   4. CHECK 2FA:');
      console.log('      - If 2FA is enabled, you MUST use an App Password');
      console.log('      - Regular password will NOT work');
      console.log('');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🌐 Connection Refused - Check:');
      console.log('   - Firewall/antivirus blocking port 465');
      console.log('   - VPN interfering with connection');
      console.log('   - Try from a different network');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n⏱️ Connection Timeout - Check:');
      console.log('   - Network connectivity');
      console.log('   - Port 465 might be blocked');
    }

    console.log('\n📝 Full error object:');
    console.log(error);
  }
}

// Run the test
testSMTPConnection();
