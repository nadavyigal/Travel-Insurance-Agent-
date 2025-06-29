# Google Sheets Integration Setup

## Step 1: Set up Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `public/google-apps-script.js`
4. Save the project (Ctrl+S) and give it a name like "Dikla Travel Insurance API"

## Step 2: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Description: "Dikla Travel Insurance Lead Handler"
4. **Execute as: "Me"** (CRITICAL)
5. **Who has access: "Anyone"** (CRITICAL - this must be set to "Anyone" for the app to work)
6. Click "Deploy"
7. **IMPORTANT**: Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 3: Update the Application

1. Open `src/utils/googleSheets.ts`
2. Find the line: `const GOOGLE_SHEETS_URL = 'YOUR_SCRIPT_ID_PLACEHOLDER';`
3. Replace `'YOUR_SCRIPT_ID_PLACEHOLDER'` with your actual Web App URL from step 2
4. Save the file

**Example:**
```typescript
// Before:
const GOOGLE_SHEETS_URL = 'YOUR_SCRIPT_ID_PLACEHOLDER';

// After:
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyN1r-P4513fImH_bCXZVqfFr9cMQB7idLj3yRygfUHG0SxCxd_LVJOEVoGZPDP4CX8-A/exec';
```

## Step 4: Test the Integration

1. Fill out the quote form on your website
2. Check your Google Sheet - you should see new tabs created:
   - `leads_raw` - for lead submissions
   - `chat_logs` - for chat interactions

## Your Google Sheet

Your sheet is already configured: https://docs.google.com/spreadsheets/d/1b8uTtwBkfhauEaEtbr0JrHWWMVMbaNYbPChXAEm-D8Y/edit

The script will automatically create the necessary tabs and headers when the first data is submitted.

## Troubleshooting

### Common Issues:

1. **"Failed to fetch" error**: 
   - **MOST COMMON CAUSE**: The `GOOGLE_SHEETS_URL` in `src/utils/googleSheets.ts` is still set to `'YOUR_SCRIPT_ID_PLACEHOLDER'`
   - Ensure you've replaced the placeholder with your actual Google Apps Script Web App URL
   - Ensure the Google Apps Script is deployed as a web app
   - Verify "Who has access" is set to "Anyone"
   - Verify "Execute as" is set to "Me"

2. **Permission errors**: 
   - Make sure "Execute as: Me" is selected
   - Ensure "Who has access: Anyone" is selected during deployment
   - Try creating a new deployment if the current one isn't working

3. **Data not appearing**: 
   - Check the Google Apps Script logs for errors (View → Logs in the script editor)
   - Verify the spreadsheet ID in the script matches your sheet
   - Test the script URL directly in a browser

4. **CORS errors**:
   - This usually means the deployment settings are incorrect
   - Redeploy with correct permissions ("Anyone" access is crucial)
   - Make sure you're using the Web App URL, not the script editor URL

### Testing the Script Directly:

You can test if your Google Apps Script is working by visiting the Web App URL directly in your browser. You should see a JSON response like:
```json
{
  "message": "Dikla Travel Insurance Google Apps Script is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

If you don't see this response, the script is not properly deployed.

### Step-by-Step Verification:

1. **Check the URL**: Make sure `GOOGLE_SHEETS_URL` in `src/utils/googleSheets.ts` is NOT `'YOUR_SCRIPT_ID_PLACEHOLDER'`
2. **Test the URL**: Visit your Google Apps Script Web App URL directly in a browser
3. **Check permissions**: In Google Apps Script, go to Deploy → Manage deployments and verify settings
4. **Redeploy if needed**: If settings are wrong, create a new deployment with correct permissions

### If Still Not Working:

1. Delete the current deployment in Google Apps Script
2. Create a completely new deployment
3. Make sure "Execute as: Me" and "Who has access: Anyone" are selected
4. Copy the new Web App URL and update `src/utils/googleSheets.ts`
5. Test the new URL in your browser first before testing the form