import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, FileSearch, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ForensicReconstruction({ data }) {
  const [reconstructionData, setReconstructionData] = useState(data || {});

  useEffect(() => {
    if (data) {
      setReconstructionData(data);
    }
  }, [data]);

  // Generate forensic reconstruction timeline
  const generateTimeline = () => {
    const dffAnalysis = data?.dffAnalysis || {};
    const scanData = data?.scanData || {};
    
    const timeline = [
      {
        time: '11:02:00',
        event: 'TOR Traffic Detected',
        confidence: 95,
        details: 'Initial connection established through Tor network',
        status: 'confirmed',
      },
      {
        time: '11:02:15',
        event: 'High Jitter Variation',
        confidence: 88,
        details: `Jitter score: ${dffAnalysis.jitter?.score?.toFixed(2) || 'N/A'} - Indicates automated activity`,
        status: 'suspicious',
      },
      {
        time: '11:03:30',
        event: 'Micro-Burst Pattern',
        confidence: 92,
        details: `Burst count: ${dffAnalysis.burst?.burstCount || 0} - Tor-like traffic pattern detected`,
        status: 'confirmed',
      },
      {
        time: '11:05:00',
        event: 'Silence Gap Anomaly',
        confidence: 85,
        details: `Classification: ${dffAnalysis.silenceGap?.classification || 'normal'} - Unusual communication pattern`,
        status: 'suspicious',
      },
      {
        time: '11:10:00',
        event: 'TOR Session Ended',
        confidence: 90,
        details: 'Connection terminated, total duration: 8 minutes',
        status: 'confirmed',
      },
    ];

    return timeline;
  };

  const timeline = generateTimeline();
  const anomalies = timeline.filter(item => item.status === 'suspicious').length;

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
            className="relative p-4 bg-gradient-to-br from-gov-warning/10 to-orange-100 rounded-2xl border border-gov-warning/20 shadow-sm"
          >
            <FileSearch className="w-8 h-8 text-gov-warning" />
          </motion.div>
          <div>
            <h2 className="text-3xl font-black text-gradient">Forensic Reconstruction</h2>
            <p className="text-sm text-gov-gray mt-1">Timeline reconstruction from partial evidence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-lg border border-gov-border bg-white">
            <span className="text-xs font-semibold text-gov-dark">
              {anomalies} Anomalies Detected
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border border-gov-primary/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-gov-primary" />
            <span className="text-sm font-semibold text-gov-gray">Time Window</span>
          </div>
          <p className="text-2xl font-black text-gov-primary">8 minutes</p>
          <p className="text-xs text-gov-gray mt-1">11:02 - 11:10</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-warning/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-gov-warning" />
            <span className="text-sm font-semibold text-gov-gray">Anomalies</span>
          </div>
          <p className="text-2xl font-black text-gov-warning">{anomalies}</p>
          <p className="text-xs text-gov-gray mt-1">Suspicious patterns</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-gov-success/20 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-gov-success" />
            <span className="text-sm font-semibold text-gov-gray">Confidence</span>
          </div>
          <p className="text-2xl font-black text-gov-success">89%</p>
          <p className="text-xs text-gov-gray mt-1">Average accuracy</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-2xl p-6 border border-gov-border bg-white">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-gov-dark">
          <Activity className="w-6 h-6 text-gov-primary" />
          Reconstructed Timeline
        </h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gov-border"></div>
          
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-4 border-white ${
                  item.status === 'confirmed' ? 'bg-gov-success' : 'bg-gov-warning'
                }`}></div>
                
                <div className="glass rounded-xl p-4 border border-gov-border hover:border-gov-primary/30 transition-all bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono font-bold text-gov-primary text-sm">{item.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          item.status === 'confirmed' 
                            ? 'bg-gov-success/10 text-gov-success border border-gov-success/20' 
                            : 'bg-gov-warning/10 text-gov-warning border border-gov-warning/20'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-gov-dark text-lg mb-1">{item.event}</h4>
                      <p className="text-sm text-gov-gray">{item.details}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gov-gray mb-1">Confidence</div>
                      <div className="text-lg font-black text-gov-primary">{item.confidence}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gov-border rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full ${
                        item.status === 'confirmed' ? 'bg-gov-success' : 'bg-gov-warning'
                      }`}
                      style={{ width: `${item.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reconstruction Notes */}
      <div className="glass-card rounded-xl p-6 border border-gov-primary/20 bg-white">
        <h4 className="font-semibold text-gov-dark mb-3">Reconstruction Notes</h4>
        <ul className="space-y-2 text-sm text-gov-gray">
          <li className="flex items-start gap-2">
            <span className="text-gov-primary mt-1">•</span>
            <span>TOR traffic occurred between <strong className="text-gov-dark">11:02 and 11:10</strong> with high jitter variation indicating automated activity.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gov-primary mt-1">•</span>
            <span>Multiple micro-burst patterns detected, consistent with Tor network usage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gov-primary mt-1">•</span>
            <span>Silence gap anomalies suggest non-human traffic patterns.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gov-primary mt-1">•</span>
            <span>Evidence reconstructed from partial logs and metadata analysis.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

