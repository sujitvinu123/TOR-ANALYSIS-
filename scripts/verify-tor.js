const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios');

// Try both common Tor ports
const TOR_PROXY_PORTS = ['socks5://127.0.0.1:9150', 'socks5://127.0.0.1:9050'];

async function verifyTorConnection() {
  console.log('🔍 Verifying Tor connection...\n');

  // Try each port
  for (const proxy of TOR_PROXY_PORTS) {
    try {
      const agent = new SocksProxyAgent(proxy);
      
      // Try to connect through Tor
      const response = await axios.get('https://check.torproject.org/', {
        httpsAgent: agent,
        httpAgent: agent,
        timeout: 10000,
      });

      if (response.status === 200) {
        const port = proxy.includes('9150') ? '9150' : '9050';
        console.log('✅ Tor connection successful!');
        console.log(`✅ SOCKS proxy is working on 127.0.0.1:${port}\n`);
        return { success: true, port };
      }
    } catch (error) {
      // Try next port
      continue;
    }
  }

  // If we get here, neither port worked
  console.error('❌ Tor connection failed!');
  console.error('Tried ports 9150 and 9050, but neither is responding.\n');
  console.log('📋 Troubleshooting:');
  console.log('1. Make sure Tor Browser is running');
  console.log('2. Wait for Tor Browser to show "Connected to the Tor network"');
  console.log('3. Check firewall settings');
  console.log('4. Try restarting Tor Browser\n');
  return { success: false };
}

verifyTorConnection().then(result => {
  process.exit(result.success ? 0 : 1);
});

