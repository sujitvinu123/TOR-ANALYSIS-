import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Server, Activity, Globe, Zap, TrendingUp } from 'lucide-react';

export default function NetworkScan({ data }) {
  const [scanData, setScanData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setScanData(data);
    }
  }, [data]);

  const scan = scanData.scanData || {};

  const networkStats = [
    {
      icon: Server,
      label: 'Active Nodes',
      value: scan.activeNodes || 0,
      color: 'gov-primary',
      gradient: 'from-gov-primary to-gov-secondary',
    },
    {
      icon: Wifi,
      label: 'Exit Nodes',
      value: scan.exitNodes || 0,
      color: 'gov-secondary',
      gradient: 'from-gov-secondary to-blue-400',
    },
    {
      icon: Activity,
      label: 'Relays',
      value: scan.relays || 0,
      color: 'gov-accent',
      gradient: 'from-gov-accent to-blue-500',
    },
    {
      icon: TrendingUp,
      label: 'Bandwidth',
      value: scan.bandwidth || 0,
      color: 'gov-warning',
      gradient: 'from-gov-warning to-orange-500',
      suffix: ' MB/s',
    },
  ];

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
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="relative p-4 bg-gradient-to-br from-gov-primary/10 to-gov-secondary/10 rounded-2xl border border-gov-primary/20 shadow-sm"
          >
            <Globe className="w-8 h-8 text-gov-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-gov-success rounded-full"
            ></motion.div>
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-gradient">Tor Network Scan</h2>
            <p className="text-sm text-gov-gray mt-1">Real-time network infrastructure analysis</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-gradient-to-r from-gov-primary/10 to-gov-secondary/10 border border-gov-primary/20 rounded-full"
        >
          <span className="text-xs font-bold text-gov-primary flex items-center gap-2">
            <Zap className="w-3 h-3" />
            LIVE SCAN
          </span>
        </motion.div>
      </div>

      {/* Network Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {networkStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card rounded-2xl p-6 border border-gov-border relative overflow-hidden group cursor-pointer bg-white"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-2 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}
                  >
                    <Icon className={`w-5 h-5 text-${stat.color}`} />
                  </motion.div>
                  <span className="text-gov-gray text-sm font-medium">{stat.label}</span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className={`text-4xl font-black text-${stat.color} mb-1`}
                >
                  {stat.value.toLocaleString()}{stat.suffix || ''}
                </motion.p>
                <div className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full mt-3`} style={{ width: `${Math.min(100, (stat.value / 10000) * 100)}%` }}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Last Scan Info */}
      {scan.timestamp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-xl p-4 border border-gov-border flex items-center justify-between bg-white"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gov-primary/10 rounded-lg border border-gov-primary/20">
              <Activity className="w-4 h-4 text-gov-primary" />
            </div>
            <span className="text-sm text-gov-gray">Last Scan:</span>
            <span className="text-sm font-semibold text-gov-primary">
              {new Date(scan.timestamp).toLocaleString()}
            </span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-gov-success rounded-full"
          ></motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
