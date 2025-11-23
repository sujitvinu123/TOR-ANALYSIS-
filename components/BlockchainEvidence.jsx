import { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, FileText, Lock } from 'lucide-react';

export default function BlockchainEvidence({ data }) {
  const [evidenceData, setEvidenceData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setEvidenceData(data);
    }
  }, [data]);

  const report = evidenceData.report || {};
  const recentEvidence = report.recentEvidence || [];

  const getSeverityColor = (status) => {
    if (status === 'INTACT') return 'text-green-400';
    if (status === 'COMPROMISED') return 'text-cyber-red';
    return 'text-cyber-yellow';
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6 hover:border-cyber-blue/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyber-purple/20 rounded-lg">
          <Shield className="w-6 h-6 text-cyber-purple" />
        </div>
        <h2 className="text-2xl font-bold text-glow">Blockchain Evidence Chain</h2>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-strong rounded-xl p-4 border border-cyber-blue/20">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-cyber-blue" />
            <span className="text-gray-400">Chain Length</span>
          </div>
          <p className="text-3xl font-bold text-cyber-blue">{report.chainLength || 0}</p>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-cyber-purple/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-cyber-purple" />
            <span className="text-gray-400">Integrity Status</span>
          </div>
          <p className={`text-2xl font-bold ${getSeverityColor(report.integrityStatus)}`}>
            {report.integrityStatus || 'UNKNOWN'}
          </p>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-cyber-yellow/20">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-cyber-yellow" />
            <span className="text-gray-400">Court Ready</span>
          </div>
          <p className={`text-2xl font-bold ${report.courtReady ? 'text-green-400' : 'text-cyber-red'}`}>
            {report.courtReady ? 'YES' : 'NO'}
          </p>
        </div>
      </div>

      {/* Verification Status */}
      {report.verification && (
        <div className="glass-strong rounded-xl p-4 border border-cyber-blue/20">
          <div className="flex items-center gap-2 mb-3">
            {report.verification.valid ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-cyber-red" />
            )}
            <h3 className="font-semibold">Chain Verification</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={report.verification.valid ? 'text-green-400' : 'text-cyber-red'}>
                {report.verification.valid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            {report.verification.blockCount && (
              <div className="flex justify-between">
                <span className="text-gray-400">Blocks Verified:</span>
                <span className="text-cyber-blue">{report.verification.blockCount}</span>
              </div>
            )}
            {report.verification.reason && (
              <div className="flex justify-between">
                <span className="text-gray-400">Issue:</span>
                <span className="text-cyber-red">{report.verification.reason}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Evidence Blocks */}
      <div className="glass-strong rounded-xl p-4 border border-cyber-purple/20">
        <h3 className="font-semibold mb-3">Recent Evidence Blocks</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recentEvidence.slice(-5).map((block, idx) => (
            <div
              key={idx}
              className="glass rounded-lg p-3 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-mono text-cyber-blue">Block #{block.index}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(block.timestamp).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-mono truncate max-w-md">
                    Hash: {block.hash?.substring(0, 32)}...
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {block.data?.type || 'evidence'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

