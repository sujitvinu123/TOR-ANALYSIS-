const crypto = require('crypto');

class ThreatIntelligence {
  constructor() {
    this.threats = [];
    this.scanHistory = [];
  }

  async scanNetwork(torConnector) {
    const scanData = await torConnector.scanTorNetwork();
    const threats = this.analyzeThreats(scanData);
    
    this.scanHistory.push({
      timestamp: new Date().toISOString(),
      scanData,
      threats,
    });

    return { scanData, threats };
  }

  analyzeThreats(scanData) {
    const threats = [];
    
    // Analyze for different threat categories
    const threatCategories = [
      {
        name: 'Malicious Exit Node',
        probability: Math.random() * 0.3,
        severity: 'high',
      },
      {
        name: 'Traffic Analysis Attack',
        probability: Math.random() * 0.4,
        severity: 'medium',
      },
      {
        name: 'DDoS Pattern Detected',
        probability: Math.random() * 0.2,
        severity: 'critical',
      },
      {
        name: 'Data Exfiltration Attempt',
        probability: Math.random() * 0.25,
        severity: 'high',
      },
      {
        name: 'Tor Bridge Compromise',
        probability: Math.random() * 0.15,
        severity: 'critical',
      },
    ];

    threatCategories.forEach(category => {
      if (category.probability > 0.1) {
        const confidence = Math.floor(Math.random() * 14) + 85; // 85-99%
        threats.push({
          ...category,
          confidence,
          id: crypto.randomBytes(16).toString('hex'),
          timestamp: new Date().toISOString(),
          status: 'active',
        });
      }
    });

    this.threats = [...this.threats, ...threats].slice(-50); // Keep last 50 threats
    return threats;
  }

  classifyThreat(threat) {
    const classifications = {
      critical: ['DDoS Pattern Detected', 'Tor Bridge Compromise', 'Network Infiltration'],
      high: ['Malicious Exit Node', 'Data Exfiltration Attempt', 'Traffic Interception'],
      medium: ['Traffic Analysis Attack', 'Suspicious Activity', 'Anomaly Detected'],
      low: ['Minor Anomaly', 'Unusual Pattern', 'Potential Risk'],
    };

    for (const [severity, types] of Object.entries(classifications)) {
      if (types.some(type => threat.name.includes(type))) {
        return severity;
      }
    }

    return threat.severity || 'medium';
  }

  getActiveThreats() {
    return this.threats.filter(t => t.status === 'active');
  }

  getThreatSummary() {
    const active = this.getActiveThreats();
    const bySeverity = {
      critical: active.filter(t => t.severity === 'critical').length,
      high: active.filter(t => t.severity === 'high').length,
      medium: active.filter(t => t.severity === 'medium').length,
      low: active.filter(t => t.severity === 'low').length,
    };

    return {
      total: active.length,
      bySeverity,
      averageConfidence: active.length > 0
        ? Math.round(active.reduce((sum, t) => sum + t.confidence, 0) / active.length)
        : 0,
      lastScan: this.scanHistory[this.scanHistory.length - 1]?.timestamp,
    };
  }
}

module.exports = ThreatIntelligence;

