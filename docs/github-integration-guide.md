# GitHub Integration with Google Sheets Automation

## Overview
This guide shows you how to connect your GitHub repository to your Google Sheets investment tracker for automated updates and data synchronization.

## Setup Process

### Step 1: Create Your Google Sheet
1. **Create the investment tracker spreadsheet** using the setup guide
2. **Copy the spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

### Step 2: Set Up Google Cloud Project
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing one
3. **Enable Google Sheets API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 3: Create Service Account
1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "Service Account"**
3. **Fill in details:**
   - Name: "Investment Tracker Bot"
   - Description: "Automated investment tracker updates"
4. **Click "Create and Continue"**
5. **Skip role assignment** (click "Continue")
6. **Click "Done"**

### Step 4: Generate Service Account Key
1. **Click on your service account** in the list
2. **Go to "Keys" tab**
3. **Click "Add Key" → "Create New Key"**
4. **Choose JSON format**
5. **Download the JSON file** (keep it secure!)

### Step 5: Share Your Google Sheet
1. **Open your investment tracker spreadsheet**
2. **Click "Share" button**
3. **Add your service account email** (found in the JSON file)
4. **Give "Editor" permissions**
5. **Click "Send"**

### Step 6: Set Up GitHub Repository
1. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository** at github.com
3. **Push your code:**
   ```bash
   git remote add origin https://github.com/yourusername/investment-tracker.git
   git push -u origin main
   ```

### Step 7: Configure GitHub Secrets
1. **Go to your GitHub repository**
2. **Click "Settings" → "Secrets and variables" → "Actions"**
3. **Add these repository secrets:**

   **GOOGLE_SHEETS_CREDENTIALS:**
   - Copy the entire content of your service account JSON file
   - Paste it as the secret value

   **GOOGLE_SHEET_ID:**
   - Your spreadsheet ID from Step 1 (replace with your actual sheet ID)

   **WEALTHSIMPLE_EMAIL:**
   - Your Wealthsimple login email

   **WEALTHSIMPLE_PASSWORD:**
   - Your Wealthsimple password

### Step 8: Create GitHub Actions Workflow
The workflow file is already created in `.github/workflows/daily-update.yml`

## Automation Features

### Daily Updates
- **Stock prices** updated automatically
- **Wealthsimple portfolio** data synced
- **Daily reports** generated
- **Budget tracking** updated

### Manual Triggers
- **Run updates on demand** via GitHub Actions
- **Test automation** without waiting for schedule
- **Debug issues** with manual execution

### Notifications
- **Email alerts** for failed updates
- **Success confirmations** for completed runs
- **Error reporting** with detailed logs

## Security Best Practices

### Credential Management
- ✅ **Never commit credentials** to repository
- ✅ **Use GitHub Secrets** for sensitive data
- ✅ **Rotate service account keys** regularly
- ✅ **Limit service account permissions**

### Data Protection
- ✅ **Encrypt sensitive data** in transit
- ✅ **Use secure connections** (HTTPS)
- ✅ **Monitor access logs** regularly
- ✅ **Backup data** regularly

## Troubleshooting

### Common Issues

**1. Authentication Errors**
```bash
# Check service account permissions
# Verify JSON credentials are correct
# Ensure sheet is shared with service account
```

**2. API Quota Limits**
```bash
# Google Sheets API has daily limits
# Consider batching updates
# Monitor usage in Google Cloud Console
```

**3. Wealthsimple Login Issues**
```bash
# Check if 2FA is enabled
# Verify login credentials
# Update selectors if website changes
```

### Debug Mode
```bash
# Run locally for testing
npm install
node scripts/update-sheets.js
```

## Advanced Configuration

### Custom Schedules
Edit `.github/workflows/daily-update.yml`:
```yaml
on:
  schedule:
    # Run every 6 hours
    - cron: '0 */6 * * *'
    # Run on weekdays only
    - cron: '0 18 * * 1-5'
```

### Multiple Sheets
```javascript
// Support multiple spreadsheets
const sheets = [
  process.env.GOOGLE_SHEET_ID_1,
  process.env.GOOGLE_SHEET_ID_2
];
```

### Custom Notifications
```javascript
// Add Slack/Email notifications
async function sendNotification(message) {
  // Implement your notification logic
}
```

## Monitoring and Maintenance

### Check Automation Status
1. **Go to GitHub repository**
2. **Click "Actions" tab**
3. **View recent workflow runs**
4. **Check logs for errors**

### Update Dependencies
```bash
# Keep packages updated
npm update
npm audit fix
```

### Backup Strategy
1. **Export Google Sheet** monthly
2. **Backup GitHub repository** regularly
3. **Store credentials** securely
4. **Document changes** in README

## Next Steps

1. **Set up the automation** following this guide
2. **Test the workflow** manually first
3. **Monitor daily runs** for a week
4. **Customize schedules** as needed
5. **Add additional features** gradually

## Support

If you encounter issues:
1. **Check GitHub Actions logs**
2. **Verify Google Cloud setup**
3. **Test locally** with `npm start`
4. **Review security settings**
5. **Check API quotas**

The automation will run daily and keep your investment tracker updated automatically!
