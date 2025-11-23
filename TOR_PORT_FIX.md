# Tor Port Detection Fix

## ✅ Problem Solved!

Your Tor Browser is running on **port 9150**, not 9050. This is common on Windows.

## What Was Fixed

The app now automatically detects which port Tor Browser is using:
- ✅ Tries port **9150** first (Tor Browser on Windows)
- ✅ Falls back to port **9050** (Tor service)
- ✅ Automatically uses the correct port

## How It Works Now

1. When you start the dashboard, it tests both ports
2. Finds which port Tor Browser is actually using
3. Automatically connects to that port
4. Shows you which port was detected

## Test It

1. Make sure Tor Browser is running and connected
2. Refresh your dashboard at `http://localhost:3000`
3. The dashboard should now connect successfully!

## Verify Port

Run this command to check which port Tor is using:

```bash
npm run check-tor-port
```

You should see:
```
✅ Tor is running on port 9150!
```

## If Still Not Working

1. Make sure Tor Browser shows "Connected to the Tor network"
2. Wait a few seconds after Tor connects
3. Refresh the dashboard
4. Check browser console (F12) for any errors

---

**Note:** The app now automatically handles both ports, so you don't need to configure anything!

