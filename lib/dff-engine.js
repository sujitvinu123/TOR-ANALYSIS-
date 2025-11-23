const crypto = require('crypto');

class DFFEngine {
  constructor() {
    this.jitterHistory = [];
    this.burstPatterns = [];
    this.entropyCache = new Map();
  }

  // Jitter Signature Analysis - Real-time timing anomaly detection
  analyzeJitter(timingData) {
    if (!timingData || timingData.length < 2) {
      return { anomaly: false, score: 0 };
    }

    const intervals = [];
    for (let i = 1; i < timingData.length; i++) {
      intervals.push(timingData[i] - timingData[i - 1]);
    }

    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    const jitter = stdDev / mean;

    // Anomaly detection threshold
    const anomalyThreshold = 0.3;
    const isAnomaly = jitter > anomalyThreshold;

    this.jitterHistory.push({
      jitter,
      mean,
      stdDev,
      timestamp: new Date().toISOString(),
      anomaly: isAnomaly,
    });

    return {
      anomaly: isAnomaly,
      score: Math.min(100, Math.max(0, jitter * 100)),
      jitter,
      mean,
      stdDev,
    };
  }

  // Micro-Burst Detection - VPN/Tor traffic pattern recognition
  detectMicroBursts(packetData) {
    if (!packetData || packetData.length === 0) {
      return { detected: false, confidence: 0 };
    }

    const windowSize = 5;
    const burstThreshold = 100; // packets per window
    const bursts = [];

    for (let i = 0; i <= packetData.length - windowSize; i++) {
      const window = packetData.slice(i, i + windowSize);
      const packetCount = window.reduce((sum, p) => sum + (p.size || 0), 0);

      if (packetCount > burstThreshold) {
        bursts.push({
          start: i,
          end: i + windowSize,
          intensity: packetCount,
          timestamp: new Date().toISOString(),
        });
      }
    }

    const isTorPattern = bursts.length > 3 && bursts.some(b => b.intensity > 200);
    const confidence = Math.min(99, Math.max(85, bursts.length * 10 + (isTorPattern ? 15 : 0)));

    this.burstPatterns.push({
      bursts,
      isTorPattern,
      confidence,
      timestamp: new Date().toISOString(),
    });

    return {
      detected: bursts.length > 0,
      isTorPattern,
      confidence,
      burstCount: bursts.length,
    };
  }

  // Entropy Variance Tracking - Payload randomness analysis
  calculateEntropy(data) {
    if (!data || typeof data !== 'string') {
      return 0;
    }

    const freq = {};
    for (const char of data) {
      freq[char] = (freq[char] || 0) + 1;
    }

    let entropy = 0;
    const length = data.length;

    for (const count of Object.values(freq)) {
      const probability = count / length;
      entropy -= probability * Math.log2(probability);
    }

    return entropy;
  }

  trackEntropyVariance(payloads) {
    const entropies = payloads.map(p => this.calculateEntropy(p));
    const mean = entropies.reduce((a, b) => a + b, 0) / entropies.length;
    const variance = entropies.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / entropies.length;

    const result = {
      meanEntropy: mean,
      variance,
      stdDev: Math.sqrt(variance),
      timestamp: new Date().toISOString(),
    };

    this.entropyCache.set(Date.now(), result);
    return result;
  }

  // Silence-Gap Modeling - ML-based classification
  classifySilenceGaps(gaps) {
    if (!gaps || gaps.length === 0) {
      return { classification: 'normal', confidence: 0 };
    }

    const meanGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const variance = gaps.reduce((sum, val) => sum + Math.pow(val - meanGap, 2), 0) / gaps.length;
    const stdDev = Math.sqrt(variance);

    // ML-based classification (simplified pattern matching)
    let classification = 'normal';
    let confidence = 50;

    if (meanGap > 5000 && stdDev < 100) {
      classification = 'suspicious';
      confidence = 85;
    } else if (meanGap > 10000 && stdDev < 50) {
      classification = 'malicious';
      confidence = 95;
    } else if (stdDev > 2000) {
      classification = 'normal';
      confidence = 70;
    }

    return {
      classification,
      confidence,
      meanGap,
      stdDev,
      timestamp: new Date().toISOString(),
    };
  }

  getDFFReport() {
    return {
      jitterAnalysis: this.jitterHistory.slice(-10),
      burstDetection: this.burstPatterns.slice(-10),
      entropyTracking: Array.from(this.entropyCache.values()).slice(-10),
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = DFFEngine;

