const net = require('net');

console.log('🔍 Checking Tor connection on different ports...\n');

const ports = [9050, 9150]; // Common Tor ports
let found = false;

function checkPort(port) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    const timeout = 2000;

    client.setTimeout(timeout);

    client.on('connect', () => {
      console.log(`✅ Tor is running on port ${port}!`);
      console.log(`✅ Use this port in your configuration\n`);
      found = true;
      client.destroy();
      resolve(true);
    });

    client.on('timeout', () => {
      client.destroy();
      resolve(false);
    });

    client.on('error', () => {
      resolve(false);
    });

    client.connect(port, '127.0.0.1');
  });
}

async function checkAllPorts() {
  for (const port of ports) {
    const result = await checkPort(port);
    if (result) {
      return port;
    }
  }
  return null;
}

checkAllPorts().then((activePort) => {
  if (!activePort) {
    console.log('❌ Tor is not running on ports 9050 or 9150\n');
    console.log('📋 Please:');
    console.log('1. Open Tor Browser');
    console.log('2. Wait for it to connect to the Tor network');
    console.log('3. Make sure Tor Browser is NOT closed\n');
    console.log('💡 Note: Some Tor Browser versions use port 9150 instead of 9050');
    process.exit(1);
  } else {
    console.log(`\n✅ Configuration: Use port ${activePort}`);
    console.log(`   Update lib/tor-connector.js if needed:\n`);
    console.log(`   const TOR_PROXY = 'socks5://127.0.0.1:${activePort}';`);
    process.exit(0);
  }
});

