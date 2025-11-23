import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity, TrendingUp, Clock, Database, Eye, Zap } from 'lucide-react';

export default function YourBrowsing({ data }) {
  const [browsingData, setBrowsingData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setBrowsingData(data);
    }
  }, [data]);

  const trafficStats = browsingData.trafficStats || {};
  const patterns = browsingData.browsingPatterns || {};
  const recentActivity = trafficStats.recentRequests || [];

  const statCards = [
    {
      icon: Activity,
      label: 'Total Requests',
      value: trafficStats.totalRequests || 0,
      color: 'gov-primary',
      gradient: 'from-gov-primary to-gov-secondary',
    },
    {
      icon: Database,
      label: 'Data Transferred',
      value: `${trafficStats.dataTransferredMB || '0.00'} MB`,
      color: 'gov-secondary',
      gradient: 'from-gov-secondary to-blue-400',
    },
    {
      icon: TrendingUp,
      label: 'Requests/sec',
      value: trafficStats.requestsPerSecond || '0.00',
      color: 'gov-accent',
      gradient: 'from-gov-accent to-blue-500',
    },
    {
      icon: Clock,
      label: 'Uptime',
      value: `${trafficStats.uptimeSeconds || 0}s`,
      color: 'gov-warning',
      gradient: 'from-gov-warning to-orange-500',
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
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative p-4 bg-gradient-to-br from-gov-primary/10 to-gov-secondary/10 rounded-2xl border border-gov-primary/20 shadow-sm"
          >
            <Eye className="w-8 h-8 text-gov-primary" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gov-success rounded-full status-dot"></div>
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-gradient">Your Tor Browser Activity</h2>
            <p className="text-sm text-gov-gray mt-1">Real-time monitoring & analysis</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-gradient-to-r from-gov-primary/10 to-gov-secondary/10 border border-gov-primary/20 rounded-full"
        >
          <span className="text-xs font-bold text-gov-primary flex items-center gap-2">
            <Zap className="w-3 h-3" />
            LIVE MONITORING
          </span>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-${stat.color}/10 rounded-lg border border-${stat.color}/20`}>
                    <Icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <span className="text-gov-gray text-sm font-medium">{stat.label}</span>
                </div>
                <p className={`text-4xl font-black text-${stat.color} mb-1`}>{stat.value}</p>
                <div className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full mt-3`} style={{ width: '60%' }}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Top Domains & Recent Activity Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Domains */}
        {patterns.topDomains && patterns.topDomains.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6 border border-gov-border bg-white"
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-3 text-gov-dark">
              <div className="p-2 bg-gov-primary/10 rounded-lg border border-gov-primary/20">
                <Globe className="w-5 h-5 text-gov-primary" />
              </div>
              Top Visited Domains
            </h3>
            <div className="space-y-3">
              {patterns.topDomains.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="glass rounded-xl p-4 border border-gov-border hover:border-gov-primary/30 transition-all flex justify-between items-center group bg-white"
                >
                  <span className="text-sm font-mono text-gov-primary font-semibold truncate flex-1">
                    {item.domain}
                  </span>
                  <span className="text-sm text-gov-gray bg-gov-primary/10 px-3 py-1 rounded-full font-medium">
                    {item.count} visits
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6 border border-gov-border bg-white"
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-3 text-gov-dark">
              <div className="p-2 bg-gov-secondary/10 rounded-lg border border-gov-secondary/20">
                <Activity className="w-5 h-5 text-gov-secondary" />
              </div>
              Recent Activity
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.slice(-10).reverse().map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-4 border border-gov-border hover:border-gov-secondary/30 transition-all bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gov-primary truncate max-w-md font-semibold">
                      {activity.url}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      activity.status === 200 
                        ? 'bg-gov-success/10 text-gov-success border border-gov-success/20' 
                        : 'bg-gov-danger/10 text-gov-danger border border-gov-danger/20'
                    }`}>
                      {activity.status || 'Error'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gov-gray">
                    <span className="bg-gov-primary/10 px-2 py-1 rounded">{activity.dataSize ? `${(activity.dataSize / 1024).toFixed(2)} KB` : 'N/A'}</span>
                    <span className="text-gov-secondary">•</span>
                    <span className="bg-gov-secondary/10 px-2 py-1 rounded">{activity.duration}ms</span>
                    <span className="text-gov-primary">•</span>
                    <span className="text-gov-gray">{new Date(activity.timestamp).toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Empty State */}
      {recentActivity.length === 0 && patterns.topDomains?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-12 border border-gov-border text-center bg-white"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-gradient-to-br from-gov-warning/10 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gov-warning/20"
          >
            <Globe className="w-8 h-8 text-gov-warning" />
          </motion.div>
          <p className="text-gov-dark text-lg font-semibold mb-2">No browsing activity detected yet</p>
          <p className="text-sm text-gov-gray">
            Start browsing through Tor Browser to see your activity here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
