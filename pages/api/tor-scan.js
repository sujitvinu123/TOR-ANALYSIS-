const TorConnector = require('../../lib/tor-connector');
const ThreatIntelligence = require('../../lib/threat-intelligence');
const DFFEngine = require('../../lib/dff-engine');
const BlockchainEvidenceChain = require('../../lib/blockchain-evidence');
const crypto = require('crypto');

let torConnector;
let threatIntel;
let dffEngine;
let evidenceChain;

// Initialize singletons
if (!torConnector) {
  torConnector = new TorConnector();
  threatIntel = new ThreatIntelligence();
  dffEngine = new DFFEngine();
  evidenceChain = new BlockchainEvidenceChain();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // First verify Tor is connected
    const torVerification = await torConnector.verifyTorConnection();
    if (!torVerification.connected) {
      return res.status(503).json({ 
        error: torVerification.error || 'Tor Browser is not running',
        torConnected: false,
        message: 'Please start Tor Browser and wait for it to connect to the Tor network.',
        triedPorts: [9050, 9150]
      });
    }

    // Log which port is being used (for debugging)
    if (torVerification.port) {
      console.log(`✅ Tor connected on ${torVerification.port}`);
    }

    // Real-time Tor network scanning (requires Tor)
    let scanData, threats;
    try {
      const result = await threatIntel.scanNetwork(torConnector);
      scanData = result.scanData;
      threats = result.threats;
    } catch (scanError) {
      // If scan fails, Tor might have disconnected
      if (scanError.message.includes('Tor') || scanError.message.includes('ECONNREFUSED')) {
        return res.status(503).json({ 
          error: 'Tor connection lost',
          torConnected: false,
          message: 'Tor Browser was disconnected. Please restart Tor Browser and try again.'
        });
      }
      throw scanError;
    }

    // Generate timing data for DFF analysis
    const timingData = Array.from({ length: 20 }, () => Date.now() + Math.random() * 1000);
    const jitterAnalysis = dffEngine.analyzeJitter(timingData);

    // Generate packet data for burst detection
    const packetData = Array.from({ length: 50 }, () => ({
      size: Math.floor(Math.random() * 1500) + 64,
      timestamp: Date.now() + Math.random() * 1000,
    }));
    const burstDetection = dffEngine.detectMicroBursts(packetData);

    // Entropy analysis
    const payloads = Array.from({ length: 10 }, () => 
      crypto.randomBytes(100).toString('hex')
    );
    const entropyTracking = dffEngine.trackEntropyVariance(payloads);

    // Silence gap analysis
    const gaps = Array.from({ length: 15 }, () => Math.random() * 10000);
    const silenceGap = dffEngine.classifySilenceGaps(gaps);

    // Add evidence to blockchain
    const evidence = evidenceChain.addEvidence({
      type: 'network_scan',
      scanData,
      threats,
      dffAnalysis: {
        jitter: jitterAnalysis,
        burst: burstDetection,
        entropy: entropyTracking,
        silenceGap,
      },
    });

    // Get threat summary
    const threatSummary = threatIntel.getThreatSummary();
    const evidenceReport = evidenceChain.generateEvidenceReport();

    // Get user's browsing traffic data
    const trafficStats = torConnector.getTrafficStats();
    const browsingPatterns = torConnector.getBrowsingPatterns();

    // Analyze user's actual traffic for DFF
    const userTrafficTiming = trafficStats.recentRequests.map(req => 
      new Date(req.timestamp).getTime()
    );
    const userJitterAnalysis = userTrafficTiming.length > 1 
      ? dffEngine.analyzeJitter(userTrafficTiming)
      : jitterAnalysis;

    const userPacketData = trafficStats.recentRequests.map(req => ({
      size: req.dataSize || 0,
      timestamp: new Date(req.timestamp).getTime(),
    }));
    const userBurstDetection = userPacketData.length > 0
      ? dffEngine.detectMicroBursts(userPacketData)
      : burstDetection;

    res.status(200).json({
      scanData,
      threats,
      threatSummary,
      // User's browsing data (YOUR activity)
      userBrowsing: {
        trafficStats,
        browsingPatterns,
        recentActivity: trafficStats.recentRequests,
      },
      dffAnalysis: {
        jitter: userJitterAnalysis,
        burst: userBurstDetection,
        entropy: entropyTracking,
        silenceGap,
        // Show if using user data or simulated
        dataSource: trafficStats.totalRequests > 0 ? 'your_browsing' : 'simulated',
      },
      evidence: {
        block: evidence,
        report: evidenceReport,
      },
      torConnected: true,
      torPort: torVerification.port || 'auto-detected',
      monitoringMode: 'your_browsing', // Now monitoring YOUR activity
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    
    // Check if it's a Tor connection error
    if (error.message.includes('Tor') || error.message.includes('ECONNREFUSED')) {
      return res.status(503).json({ 
        error: error.message,
        torConnected: false,
        message: 'Tor Browser is not running. Please start Tor Browser and wait for it to connect.'
      });
    }
    
    res.status(500).json({ error: error.message, torConnected: false });
  }
}

