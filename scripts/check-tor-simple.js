const net = require('net');

console.log('🔍 Checking Tor connection...\n');

// Check both common Tor ports
const ports = [9150, 9050]; // Try 9150 first (Tor Browser on Windows), then 9050

function checkPort(port) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    const timeout = 2000;

    client.setTimeout(timeout);

    client.on('connect', () => {
      console.log(`✅ Tor SOCKS proxy is running on port ${port}!`);
      console.log('✅ Your app can connect to Tor network\n');
      client.destroy();
      resolve(port);
    });

    client.on('timeout', () => {
      client.destroy();
      resolve(null);
    });

    client.on('error', () => {
      resolve(null);
    });

    client.connect(port, '127.0.0.1');
  });
}

async function checkAllPorts() {
  for (const port of ports) {
    const result = await checkPort(port);
    if (result) {
      return result;
    }
  }
  return null;
}

checkAllPorts().then((activePort) => {
  if (!activePort) {
    console.log('❌ Tor Browser is not running on ports 9050 or 9150');
    console.log('\n📋 Please:');
    console.log('1. Open Tor Browser');
    console.log('2. Wait for it to connect to the Tor network');
    console.log('3. Run this command again\n');
    process.exit(1);
  } else {
    process.exit(0);
  }
});

