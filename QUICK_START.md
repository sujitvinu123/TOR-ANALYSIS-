# Quick Start Guide - Tor Browser Setup

## 🚀 Simple 3-Step Setup

### Step 1: Install Tor Browser

1. **Download Tor Browser:**
   - Go to: https://www.torproject.org/download/
   - Download the version for Windows
   - Install it (just click through the installer)

2. **Launch Tor Browser:**
   - Open Tor Browser from your Start Menu
   - Wait for it to connect (you'll see "Connected to the Tor network")
   - **IMPORTANT: Keep Tor Browser open!** (You can minimize it, but don't close it)

### Step 2: Verify Connection

Open PowerShell or Command Prompt in your project folder and run:

```bash
npm run verify-tor
```

**Expected Output:**
```
✅ Tor connection successful!
✅ SOCKS proxy is working on 127.0.0.1:9050
```

If you see an error, make sure Tor Browser is running and connected.

### Step 3: Start the Dashboard

1. **In a new terminal, run:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to: `http://localhost:3000`
   - The dashboard will automatically connect to Tor!

## ✅ That's It!

Your dashboard is now connected to the Tor network and fetching real data!

## 🔧 Troubleshooting

### "Tor connection failed" Error

**Solution:**
1. Make sure Tor Browser is **running and connected**
2. Look at Tor Browser - it should say "Connected to the Tor network"
3. If not connected, wait for Tor Browser to connect first
4. Then run `npm run verify-tor` again

### Dashboard shows "Connecting..." forever

**Solution:**
1. Check if Tor Browser is still running
2. Open browser console (Press F12) and check for errors
3. Try refreshing the page
4. Run `npm run verify-tor` to test connection

### Port Already in Use

If you get a port error:
1. Close any other applications using port 3000
2. Or change the port in `package.json`:
   ```json
   "dev": "next dev -p 3001"
   ```

## 📝 Important Notes

- **Tor Browser MUST stay open** while using the dashboard
- The dashboard connects through Tor Browser's SOCKS proxy (port 9050)
- All network scans go through the Tor network for privacy
- Data updates every 10 seconds automatically

## 🎯 Quick Checklist

Before starting the dashboard:
- [ ] Tor Browser installed
- [ ] Tor Browser is running
- [ ] Tor Browser shows "Connected to the Tor network"
- [ ] `npm run verify-tor` shows ✅ success
- [ ] Ready to run `npm run dev`

---

**Need more help?** Check `TOR_SETUP_GUIDE.md` for detailed instructions.

