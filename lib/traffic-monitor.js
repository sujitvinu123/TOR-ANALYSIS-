const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios');
const crypto = require('crypto');

class TrafficMonitor {
  constructor(agent) {
    this.agent = agent;
    this.trafficLog = [];
    this.requestHistory = [];
    this.packetCount = 0;
    this.dataTransferred = 0;
    this.startTime = Date.now();
  }

  async monitorRequest(url, options = {}) {
    const requestId = crypto.randomBytes(8).toString('hex');
    const startTime = Date.now();
    
    try {
      const response = await axios.get(url, {
        ...options,
        httpsAgent: this.agent,
        httpAgent: this.agent,
        timeout: 30000,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;
      const dataSize = JSON.stringify(response.data).length;

      const requestData = {
        id: requestId,
        url: url,
        method: 'GET',
        status: response.status,
        duration: duration,
        dataSize: dataSize,
        timestamp: new Date().toISOString(),
        headers: response.headers,
      };

      this.trafficLog.push(requestData);
      this.requestHistory.push(requestData);
      this.packetCount++;
      this.dataTransferred += dataSize;

      // Keep only last 1000 requests
      if (this.trafficLog.length > 1000) {
        this.trafficLog.shift();
      }

      return { response, requestData };
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const requestData = {
        id: requestId,
        url: url,
        method: 'GET',
        status: 'error',
        error: error.message,
        duration: duration,
        timestamp: new Date().toISOString(),
      };

      this.trafficLog.push(requestData);
      this.requestHistory.push(requestData);
      this.packetCount++;

      throw error;
    }
  }

  getTrafficStats() {
    const uptime = Date.now() - this.startTime;
    const requestsPerSecond = this.packetCount / (uptime / 1000);
    
    return {
      totalRequests: this.packetCount,
      totalDataTransferred: this.dataTransferred,
      dataTransferredMB: (this.dataTransferred / (1024 * 1024)).toFixed(2),
      uptime: uptime,
      uptimeSeconds: Math.floor(uptime / 1000),
      requestsPerSecond: requestsPerSecond.toFixed(2),
      recentRequests: this.trafficLog.slice(-20),
    };
  }

  getBrowsingPatterns() {
    const domains = {};
    const statusCodes = {};
    const timePatterns = {};

    this.trafficLog.forEach(req => {
      try {
        const urlObj = new URL(req.url);
        const domain = urlObj.hostname;
        domains[domain] = (domains[domain] || 0) + 1;
      } catch (e) {
        // Invalid URL
      }

      if (req.status) {
        statusCodes[req.status] = (statusCodes[req.status] || 0) + 1;
      }

      const hour = new Date(req.timestamp).getHours();
      timePatterns[hour] = (timePatterns[hour] || 0) + 1;
    });

    return {
      topDomains: Object.entries(domains)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([domain, count]) => ({ domain, count })),
      statusCodes,
      timePatterns,
    };
  }

  clearHistory() {
    this.trafficLog = [];
    this.requestHistory = [];
    this.packetCount = 0;
    this.dataTransferred = 0;
    this.startTime = Date.now();
  }
}

module.exports = TrafficMonitor;

