import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, AlertTriangle, TrendingDown, TrendingUp, Activity } from 'lucide-react';

export default function RelayIntelligence({ data }) {
  const [intelligenceData, setIntelligenceData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setIntelligenceData(data);
    }
  }, [data]);

  const scanData = data?.scanData || {};

  // Generate relay intelligence data
  const relayIntelligence = [
    {
      id: 'R001',
      type: 'Relay',
      trustScore: 95,
      status: 'trusted',
      uptime: '99.2%',
      bandwidth: '125 MB/s',
      anomalies: 0,
      lastSeen: '2 minutes ago',
    },
    {
      id: 'E045',
      type: 'Exit Node',
      trustScore: 72,
      status: 'suspicious',
      uptime: '85.3%',
      bandwidth: '89 MB/s',
      anomalies: 3,
      lastSeen: '5 minutes ago',
    },
    {
      id: 'R128',
      type: 'Relay',
      trustScore: 88,
      status: 'trusted',
      uptime: '97.8%',
      bandwidth: '156 MB/s',
      anomalies: 1,
      lastSeen: '1 minute ago',
    },
    {
      id: 'E089',
      type: 'Exit Node',
      trustScore: 45,
      status: 'malicious',
      uptime: '62.1%',
      bandwidth: '34 MB/s',
      anomalies: 8,
      lastSeen: '15 minutes ago',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'trusted':
        return 'gov-success';
      case 'suspicious':
        return 'gov-warning';
      case 'malicious':
        return 'gov-danger';
      default:
        return 'gov-gray';
    }
  };

  const totalRelays = scanData.relays || 0;
  const totalExitNodes = scanData.exitNodes || 0;
  const suspiciousCount = relayIntelligence.filter(r => r.status === 'suspicious' || r.status === 'malicious').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-8 space-y-8 group bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="relative p-4 bg-gradient-to-br from-gov-secondary/10 to-blue-100 rounded-2xl border border-gov-secondary/20 shadow-sm"
          >
            <Network className="w-8 h-8 text-gov-secondary" />
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-gradient">Relay & Exit-Node Intelligence</h2>
            <p className="text-sm text-gov-gray mt-1">Network-level abuse detection & trust scoring</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg border border-gov-border bg-white">
            <span className="text-xs font-semibold text-gov-dark">
              {suspiciousCount} Suspicious Nodes
            </span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-6 border border-gov-primary/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Network className="w-5 h-5 text-gov-primary" />
            <span className="text-sm font-semibold text-gov-gray">Total Relays</span>
          </div>
          <p className="text-3xl font-black text-gov-primary">{totalRelays.toLocaleString()}</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-secondary/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-gov-secondary" />
            <span className="text-sm font-semibold text-gov-gray">Exit Nodes</span>
          </div>
          <p className="text-3xl font-black text-gov-secondary">{totalExitNodes.toLocaleString()}</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-warning/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-gov-warning" />
            <span className="text-sm font-semibold text-gov-gray">Suspicious</span>
          </div>
          <p className="text-3xl font-black text-gov-warning">{suspiciousCount}</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-success/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-gov-success" />
            <span className="text-sm font-semibold text-gov-gray">Trusted</span>
          </div>
          <p className="text-3xl font-black text-gov-success">
            {relayIntelligence.filter(r => r.status === 'trusted').length}
          </p>
        </div>
      </div>

      {/* Relay Intelligence Table */}
      <div className="glass-card rounded-2xl p-6 border border-gov-border bg-white">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-gov-dark">
          <Shield className="w-6 h-6 text-gov-primary" />
          Node Analysis & Trust Scores
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gov-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Node ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Trust Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Uptime</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Anomalies</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gov-gray">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {relayIntelligence.map((node, idx) => {
                const statusColor = getStatusColor(node.status);
                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(30, 64, 175, 0.05)' }}
                    className="border-b border-gov-border hover:bg-gov-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-gov-primary">{node.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gov-gray">{node.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gov-border rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${statusColor}`}
                            style={{ width: `${node.trustScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gov-dark">{node.trustScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-${statusColor}/10 text-${statusColor} border border-${statusColor}/20`}>
                        {node.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {node.uptime > '90%' ? (
                          <TrendingUp className="w-4 h-4 text-gov-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-gov-warning" />
                        )}
                        <span className="text-sm text-gov-gray">{node.uptime}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-semibold ${
                        node.anomalies > 5 ? 'text-gov-danger' : 
                        node.anomalies > 0 ? 'text-gov-warning' : 
                        'text-gov-success'
                      }`}>
                        {node.anomalies}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gov-gray font-mono">{node.lastSeen}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intelligence Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 border border-gov-primary/20 bg-white">
          <h4 className="font-semibold text-gov-dark mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gov-warning" />
            Anomaly Detection
          </h4>
          <ul className="space-y-2 text-sm text-gov-gray">
            <li className="flex items-start gap-2">
              <span className="text-gov-primary mt-1">•</span>
              <span>Bandwidth drift detected in <strong className="text-gov-dark">2 nodes</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-primary mt-1">•</span>
              <span>Uptime inconsistency in <strong className="text-gov-dark">1 exit node</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-primary mt-1">•</span>
              <span>Malicious relay patterns detected</span>
            </li>
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-success/20 bg-white">
          <h4 className="font-semibold text-gov-dark mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gov-success" />
            Network Health
          </h4>
          <ul className="space-y-2 text-sm text-gov-gray">
            <li className="flex items-start gap-2">
              <span className="text-gov-success mt-1">•</span>
              <span><strong className="text-gov-dark">95%</strong> of relays are trusted</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-success mt-1">•</span>
              <span>Average trust score: <strong className="text-gov-dark">82%</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-success mt-1">•</span>
              <span>Network stability: <strong className="text-gov-dark">Good</strong></span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

