# 🚀 START HERE - Tor Browser Setup

## Quick Setup (5 Minutes)

### ✅ Step 1: Install Tor Browser

1. **Download:** https://www.torproject.org/download/
2. **Install:** Run the installer (just click Next, Next, Install)
3. **Done!** No configuration needed

### ✅ Step 2: Start Tor Browser

1. Open **Tor Browser** from Start Menu
2. Wait for it to say **"Connected to the Tor network"**
3. **Keep it open!** (You can minimize it, but don't close it)

### ✅ Step 3: Test Connection

Open PowerShell in your project folder:

```bash
npm run check-tor
```

**Success looks like:**
```
✅ Tor SOCKS proxy is running on port 9050!
✅ Your app can connect to Tor network
```

### ✅ Step 4: Start Dashboard

In PowerShell:

```bash
npm run dev
```

Then open: **http://localhost:3000**

---

## 🎯 That's It!

Your dashboard is now connected to Tor and fetching real data!

---

## ❓ Common Questions

**Q: Do I need to configure Tor Browser?**  
A: No! Just install and run it. It works automatically.

**Q: Can I close Tor Browser?**  
A: No, keep it running. The dashboard needs it to connect to Tor network.

**Q: What if I see "Connection failed"?**  
A: Make sure Tor Browser is running and shows "Connected to the Tor network"

**Q: Does this work without internet?**  
A: No, you need internet and Tor Browser must connect to Tor network first.

---

## 📚 More Help

- **Quick Guide:** `QUICK_START.md`
- **Detailed Guide:** `TOR_SETUP_GUIDE.md`
- **Simple Instructions:** `SETUP_INSTRUCTIONS.txt`

---

## 🔧 Troubleshooting Commands

```bash
# Check if Tor is running
npm run check-tor

# Full Tor connection test
npm run verify-tor

# Start dashboard
npm run dev
```

---

**Need help?** Check the error message on the dashboard - it will tell you exactly what to do!


