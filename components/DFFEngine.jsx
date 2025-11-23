import { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DFFEngine({ data }) {
  const [dffData, setDffData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setDffData(data);
    }
  }, [data]);

  const jitter = dffData.jitter || {};
  const burst = dffData.burst || {};
  const entropy = dffData.entropy || {};
  const silenceGap = dffData.silenceGap || {};

  return (
    <div className="glass rounded-2xl p-6 space-y-6 hover:border-cyber-blue/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyber-blue/20 rounded-lg">
          <Activity className="w-6 h-6 text-cyber-blue" />
        </div>
        <h2 className="text-2xl font-bold text-glow">Dark-Flow Fingerprinting Engine</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jitter Signature Analysis */}
        <div className="glass-strong rounded-xl p-4 border border-cyber-blue/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-cyber-blue" />
            <h3 className="font-semibold">Jitter Signature Analysis</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Anomaly:</span>
              <span className={jitter.anomaly ? 'text-cyber-red' : 'text-green-400'}>
                {jitter.anomaly ? 'Detected' : 'Normal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Score:</span>
              <span className="text-cyber-blue">{jitter.score?.toFixed(2) || 0}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div
                className="bg-cyber-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, jitter.score || 0)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Micro-Burst Detection */}
        <div className="glass-strong rounded-xl p-4 border border-cyber-purple/20">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-cyber-purple" />
            <h3 className="font-semibold">Micro-Burst Detection</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Tor Pattern:</span>
              <span className={burst.isTorPattern ? 'text-cyber-orange' : 'text-gray-400'}>
                {burst.isTorPattern ? 'Detected' : 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Burst Count:</span>
              <span className="text-cyber-purple">{burst.burstCount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Confidence:</span>
              <span className="text-cyber-purple">{burst.confidence || 0}%</span>
            </div>
          </div>
        </div>

        {/* Entropy Variance Tracking */}
        <div className="glass-strong rounded-xl p-4 border border-cyber-yellow/20">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-cyber-yellow" />
            <h3 className="font-semibold">Entropy Variance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Mean Entropy:</span>
              <span className="text-cyber-yellow">
                {entropy.meanEntropy?.toFixed(3) || '0.000'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Variance:</span>
              <span className="text-cyber-yellow">
                {entropy.variance?.toFixed(3) || '0.000'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Std Dev:</span>
              <span className="text-cyber-yellow">
                {entropy.stdDev?.toFixed(3) || '0.000'}
              </span>
            </div>
          </div>
        </div>

        {/* Silence-Gap Modeling */}
        <div className="glass-strong rounded-xl p-4 border border-cyber-red/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
            <h3 className="font-semibold">Silence-Gap Modeling</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Classification:</span>
              <span
                className={
                  silenceGap.classification === 'malicious'
                    ? 'text-cyber-red'
                    : silenceGap.classification === 'suspicious'
                    ? 'text-cyber-orange'
                    : 'text-green-400'
                }
              >
                {silenceGap.classification?.toUpperCase() || 'NORMAL'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Confidence:</span>
              <span className="text-cyber-red">{silenceGap.confidence || 0}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mean Gap:</span>
              <span className="text-cyber-red">
                {silenceGap.meanGap ? `${(silenceGap.meanGap / 1000).toFixed(2)}s` : '0s'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

