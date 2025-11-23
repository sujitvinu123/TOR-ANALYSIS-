import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGrid from '../components/AnimatedGrid';
import ParticleBackground from '../components/ParticleBackground';
import Navigation from '../components/Navigation';
import DFFEngine from '../components/DFFEngine';
import BlockchainEvidence from '../components/BlockchainEvidence';
import ThreatIntelligence from '../components/ThreatIntelligence';
import NetworkScan from '../components/NetworkScan';
import ForensicReconstruction from '../components/ForensicReconstruction';
import RelayIntelligence from '../components/RelayIntelligence';
import { RefreshCw, Activity, Shield } from 'lucide-react';

export default function TorMonitoring() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tor-scan');
      
      const result = await response.json();
      
      if (!result.torConnected || result.error) {
        throw new Error(result.message || result.error || 'Tor Browser is not running');
      }
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
      
      setData(result);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to connect to Tor network. Make sure Tor Browser is running.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>TOR Traffic Monitoring - Cybersecurity System</title>
        <meta name="description" content="Metadata-Level TOR Traffic Analysis, Forensic Reconstruction & Network Intelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen gradient-cyber relative overflow-hidden">
        <AnimatedGrid />
        <ParticleBackground />
        <Navigation />
        
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20 glass border-b border-gov-border backdrop-blur-xl shadow-sm bg-white"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-gov-primary/10 to-gov-secondary/10 rounded-xl border border-gov-primary/20 shadow-sm">
                    <Shield className="w-7 h-7 text-gov-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gov-success rounded-full status-dot"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-display font-black text-gradient leading-tight">
                    TOR Traffic Monitoring & Forensic Analysis
                  </h1>
                  <p className="text-xs text-gov-gray mt-0.5 flex items-center gap-2 font-body">
                    <span className="w-1.5 h-1.5 bg-gov-success rounded-full pulse-glow"></span>
                    Metadata-Level Analysis • Forensic Reconstruction • Network Intelligence
                  </p>
                </div>
              </motion.div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg border border-gov-border bg-white">
                  <div className="w-2 h-2 bg-gov-success rounded-full status-dot"></div>
                  <span className="text-xs font-medium text-gov-success">Monitoring</span>
                </div>
                {lastUpdate && (
                  <motion.div 
                    className="text-xs text-gov-gray glass-card px-4 py-2 rounded-lg border border-gov-border bg-white flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Activity className="w-4 h-4 text-gov-primary" />
                    <span className="font-mono font-semibold text-gov-dark">
                      {lastUpdate.toLocaleTimeString()}
                    </span>
                  </motion.div>
                )}
                <motion.button
                  onClick={fetchData}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card px-4 py-2 rounded-lg border border-gov-primary/30 hover:border-gov-primary/50 transition-all flex items-center gap-2 disabled:opacity-50 group bg-white shadow-sm"
                >
                  <RefreshCw className={`w-4 h-4 text-gov-primary ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span className="text-sm font-semibold text-gov-primary hidden sm:inline">Refresh</span>
                </motion.button>
              </div>
            </div>

            {/* Dashboard Info Bar - Below Title */}
            <div className="glass-card rounded-xl p-4 border border-gov-border bg-gradient-to-r from-white to-gov-light/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gov-primary rounded-full shadow-sm"></div>
                    <span className="text-gov-gray font-body">Metadata: <span className="font-semibold text-gov-primary font-heading">Active</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gov-success rounded-full shadow-sm"></div>
                    <span className="text-gov-gray font-body">Forensics: <span className="font-semibold text-gov-success font-heading">Ready</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gov-purple rounded-full shadow-sm"></div>
                    <span className="text-gov-gray font-body">Chain: <span className="font-semibold text-gov-purple font-heading">Synced</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gov-teal rounded-full shadow-sm"></div>
                    <span className="text-gov-gray font-body">Relays: <span className="font-semibold text-gov-teal font-heading">Analyzing</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gov-indigo rounded-full shadow-sm"></div>
                    <span className="text-gov-gray font-body">Network: <span className="font-semibold text-gov-indigo font-heading">Connected</span></span>
                  </div>
                </div>
                <div className="text-xs text-gov-gray font-mono bg-gov-primary/5 px-3 py-1.5 rounded-lg border border-gov-primary/10">
                  Mode: <span className="text-gov-primary font-semibold font-heading">Metadata-Only</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-6 py-8 space-y-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-strong rounded-3xl p-8 border border-gov-danger/30 shadow-lg bg-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gov-danger/10 rounded-xl border border-gov-danger/20">
                    <Activity className="w-8 h-8 text-gov-danger" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gov-danger">Tor Browser Not Connected</h3>
                    <p className="text-gov-gray text-sm mt-1">Connection verification failed</p>
                  </div>
                </div>
                <p className="text-gov-dark mb-6 text-lg leading-relaxed">{error}</p>
              </motion.div>
            )}

            {loading && !data ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-gov-primary/20 border-t-gov-primary rounded-full mx-auto mb-6"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gradient mb-2"
                  >
                    Initializing TOR Monitoring...
                  </motion.p>
                  <p className="text-gov-gray">Loading metadata analysis systems</p>
                </div>
              </motion.div>
            ) : !error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* DFF Engine - Metadata Analysis */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <DFFEngine data={data?.dffAnalysis} />
                </motion.div>

                {/* Network Scan */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <NetworkScan data={data} />
                </motion.div>

                {/* Forensic Reconstruction */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ForensicReconstruction data={data} />
                </motion.div>

                {/* Relay Intelligence */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <RelayIntelligence data={data} />
                </motion.div>

                {/* Threat Intelligence */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <ThreatIntelligence data={data} />
                </motion.div>

                {/* Blockchain Evidence Chain */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <BlockchainEvidence data={data?.evidence} />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

