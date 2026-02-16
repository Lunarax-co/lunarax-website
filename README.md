# LunaraX Website - Form Submission Setup

## Overview
This project includes a multi-step wizard form that submits to Google Sheets and sends email notifications.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Google Sheets Setup

#### Create a Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Sheets API**
4. Go to **IAM & Admin > Service Accounts**
5. Create a service account
6. Create and download a JSON key

#### Create Google Sheet
1. Create a new Google Sheet
2. Name the first tab "Formlar" (or your preferred name)
3. Add header row:
   ```
   Timestamp | Firma Adı | Yetkili Kişi (Ad Soyad) | Telefon | Firma Türü | Sektör | Defter Türü | Aylık Fatura Adedi | Zorlanılan Konular | Lunarax'tan Beklentiler | Belge İletim Yolu | Ek Not
   ```
4. Share the sheet with the service account email (found in JSON key file)
   - Give "Editor" permission

### 3. SMTP Email Setup

#### Option A: Gmail
1. Enable 2-factor authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use these settings:
   - SMTP_HOST: smtp.gmail.com
   - SMTP_PORT: 587
   - SMTP_USER: your-email@gmail.com
   - SMTP_PASS: your-app-password

#### Option B: Other SMTP Provider
Configure your provider's SMTP settings (SendGrid, Mailgun, etc.)

### 4. Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```bash
cp .env.example .env
```

**Required variables:**
- `GOOGLE_SHEETS_ID` - The spreadsheet ID (from the URL)
- `GOOGLE_SHEETS_TAB_NAME` - Tab name (e.g., "Formlar")
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - From service account JSON
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` - From service account JSON (keep the quotes and \n characters)
- `SMTP_HOST` - Your SMTP server
- `SMTP_PORT` - Usually 587 or 465
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `EMAIL_TO` - info@hilunarax.co
- `EMAIL_FROM` - Your sender email

**Important:** For the private key, copy the entire key including:
```
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----
```
Keep it in quotes and preserve the \n characters.

### 5. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 6. Test the Form

1. Navigate to the "Firmanızı Tanıyalım" page
2. Fill out all steps
3. Submit the form
4. Verify:
   - New row appears in Google Sheet
   - Email arrives at info@hilunarax.co

### 7. Production Deployment

#### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add all environment variables in Vercel dashboard under **Settings > Environment Variables**.

#### Deploy to Other Platforms
Ensure all environment variables are configured on your hosting platform.

## API Endpoint

**POST** `/api/form`

**Request body:**
```json
{
  "companyName": "string",
  "contactPerson": "string",
  "phone": "string",
  "companyType": "string",
  "industry": "string",
  "bookType": "string",
  "monthlyInvoices": "string",
  "challenges": ["string"],
  "expectations": ["string"],
  "documentMethod": "string",
  "notes": "string (optional)"
}
```

**Response:**
- `200` - `{ ok: true }`
- `400` - `{ ok: false, error: "validation_error" }`
- `500` - `{ ok: false, error: "server_error" }`

## Troubleshooting

### Google Sheets Error
- Verify service account has "Editor" access to the sheet
- Check that GOOGLE_SHEETS_ID is correct (from URL)
- Ensure private key has proper newline characters

### Email Not Sending
- Test SMTP credentials with a simple email client
- For Gmail: verify 2FA is enabled and app password is correct
- Check SMTP_PORT (587 for TLS, 465 for SSL)

### Form Not Submitting
- Open browser console (F12) for error messages
- Verify API endpoint is accessible: `curl http://localhost:3000/api/form`
- Check that all required fields are filled

## Support

For issues, contact: info@hilunarax.co
