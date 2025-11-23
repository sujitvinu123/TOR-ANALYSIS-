import { useState, useEffect } from 'react';
import { AlertTriangle, Activity, TrendingUp, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ThreatIntelligence({ data }) {
  const [threatData, setThreatData] = useState(data || {});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      setThreatData(data);
      
      // Generate chart data from threat summary
      if (data.threatSummary) {
        const newData = {
          time: new Date().toLocaleTimeString(),
          critical: data.threatSummary.bySeverity?.critical || 0,
          high: data.threatSummary.bySeverity?.high || 0,
          medium: data.threatSummary.bySeverity?.medium || 0,
          low: data.threatSummary.bySeverity?.low || 0,
        };
        setChartData(prev => [...prev.slice(-19), newData]);
      }
    }
  }, [data]);

  const threats = threatData.threats || [];
  const summary = threatData.threatSummary || {};

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-cyber-red border-cyber-red';
      case 'high':
        return 'text-cyber-orange border-cyber-orange';
      case 'medium':
        return 'text-cyber-yellow border-cyber-yellow';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-cyber-red/20';
      case 'high':
        return 'bg-cyber-orange/20';
      case 'medium':
        return 'bg-cyber-yellow/20';
      default:
        return 'bg-gray-400/20';
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6 hover:border-cyber-blue/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyber-red/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-cyber-red" />
        </div>
        <h2 className="text-2xl font-bold text-glow">Real-Time Threat Intelligence</h2>
      </div>

      {/* Threat Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-strong rounded-xl p-4 border border-cyber-red/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
            <span className="text-gray-400 text-sm">Critical</span>
          </div>
          <p className="text-3xl font-bold text-cyber-red">
            {summary.bySeverity?.critical || 0}
          </p>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-cyber-orange/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-cyber-orange" />
            <span className="text-gray-400 text-sm">High</span>
          </div>
          <p className="text-3xl font-bold text-cyber-orange">
            {summary.bySeverity?.high || 0}
          </p>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-cyber-yellow/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-cyber-yellow" />
            <span className="text-gray-400 text-sm">Medium</span>
          </div>
          <p className="text-3xl font-bold text-cyber-yellow">
            {summary.bySeverity?.medium || 0}
          </p>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-cyber-blue/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-cyber-blue" />
            <span className="text-gray-400 text-sm">Total</span>
          </div>
          <p className="text-3xl font-bold text-cyber-blue">{summary.total || 0}</p>
        </div>
      </div>

      {/* Threat Chart */}
      {chartData.length > 0 && (
        <div className="glass-strong rounded-xl p-4 border border-cyber-blue/20">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyber-blue" />
            Threat Activity Over Time
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="critical"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="medium"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Active Threats List */}
      <div className="glass-strong rounded-xl p-4 border border-cyber-red/20">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyber-red" />
          Active Threats
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {threats.slice(0, 10).map((threat, idx) => (
            <div
              key={idx}
              className={`glass rounded-lg p-4 border-l-4 ${getSeverityColor(threat.severity)} hover:border-opacity-100 transition-all`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${getSeverityBg(threat.severity)}`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold">{threat.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getSeverityBg(threat.severity)} border ${getSeverityColor(threat.severity)}`}
                    >
                      {threat.severity?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Confidence: {threat.confidence}%</span>
                    <span>•</span>
                    <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {threat.status || 'active'}
                </div>
              </div>
            </div>
          ))}
          {threats.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No active threats detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

