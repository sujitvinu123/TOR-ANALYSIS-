# Tor Browser Setup Guide

This guide will help you set up Tor Browser and connect it to the Cybersecurity Dashboard.

## Step 1: Install Tor Browser

### Windows:
1. Download Tor Browser from: https://www.torproject.org/download/
2. Run the installer and follow the installation wizard
3. Launch Tor Browser

### macOS:
1. Download from: https://www.torproject.org/download/
2. Open the .dmg file and drag Tor Browser to Applications
3. Launch Tor Browser from Applications

### Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install torbrowser-launcher

# Or download directly from torproject.org
```

## Step 2: Configure Tor Browser for SOCKS Proxy

### Option A: Use Tor Browser (Easiest)

1. **Start Tor Browser**
   - Launch Tor Browser normally
   - Wait for it to connect to the Tor network
   - You'll see "Connected to the Tor network" message

2. **Tor Browser automatically runs a SOCKS proxy on port 9050**
   - This is the default configuration
   - No additional setup needed!

3. **Keep Tor Browser running**
   - The dashboard needs Tor Browser to stay open
   - Minimize it if needed, but don't close it

### Option B: Use Tor Service (Advanced)

If you want to run Tor as a background service instead:

**Windows:**
1. Download Tor Expert Bundle from: https://www.torproject.org/download/tor/
2. Extract it to a folder (e.g., `C:\tor`)
3. Create a `torrc` configuration file in the Tor folder:
   ```
   SocksPort 9050
   ControlPort 9051
   ```
4. Run Tor: `tor.exe` (or create a service)

**Linux:**
```bash
sudo apt-get install tor
sudo systemctl start tor
sudo systemctl enable tor  # Auto-start on boot
```

**macOS:**
```bash
brew install tor
brew services start tor
```

## Step 3: Verify Tor Connection

Run the verification script:

```bash
npm run verify-tor
```

You should see:
```
✅ Tor connection successful!
✅ SOCKS proxy is working on 127.0.0.1:9050
```

If you see an error, see Troubleshooting below.

## Step 4: Start the Dashboard

1. **Make sure Tor Browser is running** (or Tor service is active)

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:3000`
   - The dashboard will automatically connect to Tor

## Step 5: Verify Dashboard Connection

- The dashboard will show "Connecting to Tor Network..." initially
- Once connected, you'll see real-time data from the Tor network
- Network scan data will populate automatically

## Troubleshooting

### Error: "Tor connection failed"

**Solution 1: Check if Tor Browser is running**
- Make sure Tor Browser is open and connected
- Look for the "Connected" message in Tor Browser

**Solution 2: Check the port**
- Tor Browser uses port 9050 by default
- If you changed it, update `lib/tor-connector.js`:
  ```javascript
  const TOR_PROXY = 'socks5://127.0.0.1:9050'; // Change if needed
  ```

**Solution 3: Firewall blocking**
- Windows: Allow Node.js through Windows Firewall
- Check if antivirus is blocking the connection

**Solution 4: Try different Tor setup**
- If Tor Browser doesn't work, try installing Tor as a service (Option B above)

### Error: "ECONNREFUSED" or "Connection refused"

This means nothing is listening on port 9050.

**Solutions:**
1. Start Tor Browser
2. Check if another application is using port 9050
3. Restart Tor Browser

### Dashboard shows "No data" or errors

**Solutions:**
1. Check browser console (F12) for errors
2. Verify Tor connection: `npm run verify-tor`
3. Check if API endpoints are working: `http://localhost:3000/api/tor-scan`
4. Make sure Tor Browser is still running

### Tor Browser won't connect

**Solutions:**
1. Check your internet connection
2. Try connecting Tor Browser manually first
3. Some networks block Tor - try a different network
4. Check Tor Browser's connection settings

## Configuration Options

### Change Tor Proxy Port

If your Tor runs on a different port, edit `lib/tor-connector.js`:

```javascript
// Change this line:
const TOR_PROXY = 'socks5://127.0.0.1:9050';

// To your port, for example:
const TOR_PROXY = 'socks5://127.0.0.1:9150'; // Tor Browser sometimes uses 9150
```

### Use Tor Browser's Alternative Port

Some Tor Browser installations use port 9150 instead of 9050. If 9050 doesn't work, try:

1. Check Tor Browser's settings
2. Or update the port in `lib/tor-connector.js` to 9150

## Quick Start Checklist

- [ ] Tor Browser installed
- [ ] Tor Browser is running and connected
- [ ] Verified connection: `npm run verify-tor` ✅
- [ ] Started dashboard: `npm run dev`
- [ ] Opened `http://localhost:3000`
- [ ] Dashboard shows real-time data

## Need More Help?

1. Check Tor Browser's connection status
2. Run `npm run verify-tor` to test connection
3. Check the browser console (F12) for detailed errors
4. Ensure Tor Browser stays open while using the dashboard

## Important Notes

- **Tor Browser must stay running** while using the dashboard
- The dashboard connects to Tor network in real-time
- All network scans go through Tor for privacy
- Evidence is logged to blockchain for forensic integrity

