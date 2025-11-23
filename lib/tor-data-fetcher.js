const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios');

class TorDataFetcher {
  constructor(agent = null) {
    // Use provided agent or create default one
    this.agent = agent || new SocksProxyAgent('socks5://127.0.0.1:9050');
  }

  updateAgent(agent) {
    this.agent = agent;
  }

  async fetchTorDirectory() {
    // Fetch from Tor directory authorities (via Tor network)
    const directoryUrls = [
      'https://check.torproject.org/',
      'https://www.torproject.org/',
    ];

    const results = [];
    for (const url of directoryUrls) {
      try {
        const response = await axios.get(url, {
          httpsAgent: this.agent,
          httpAgent: this.agent,
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });
        
        results.push({
          url,
          status: response.status,
          dataLength: response.data?.length || 0,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        // Continue to next URL
      }
    }

    return results;
  }

  async getNetworkStats() {
    try {
      // Attempt to fetch real Tor network statistics through Tor
      const stats = await this.fetchTorDirectory();
      
      const successful = stats.filter(s => s.status === 200);
      
      return {
        successfulConnections: successful.length,
        totalAttempts: stats.length,
        connections: stats,
        torWorking: successful.length > 0,
      };
    } catch (error) {
      // If connection fails, Tor is likely not running
      if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
        throw new Error('Tor Browser is not running. Please start Tor Browser.');
      }
      return {
        successfulConnections: 0,
        totalAttempts: 0,
        error: error.message,
        torWorking: false,
      };
    }
  }
}

module.exports = TorDataFetcher;

