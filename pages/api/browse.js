const TorConnector = require('../../lib/tor-connector');

let torConnector;

// Initialize singleton
if (!torConnector) {
  torConnector = new TorConnector();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      // Verify Tor is connected
      const torVerification = await torConnector.verifyTorConnection();
      if (!torVerification.connected) {
        return res.status(503).json({ 
          error: 'Tor Browser is not running',
          torConnected: false,
        });
      }

      // Fetch URL through Tor (this will be monitored)
      const data = await torConnector.fetchFromTor(url, true); // true = monitor this request
      
      // Get updated traffic stats
      const trafficStats = torConnector.getTrafficStats();
      const browsingPatterns = torConnector.getBrowsingPatterns();

      return res.status(200).json({
        success: true,
        url: url,
        dataLength: JSON.stringify(data).length,
        trafficStats,
        browsingPatterns,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({ 
        error: error.message,
        torConnected: false,
      });
    }
  }

  if (req.method === 'GET') {
    // Get current browsing stats
    try {
      const trafficStats = torConnector.getTrafficStats();
      const browsingPatterns = torConnector.getBrowsingPatterns();

      return res.status(200).json({
        trafficStats,
        browsingPatterns,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

