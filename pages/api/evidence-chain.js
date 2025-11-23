const BlockchainEvidenceChain = require('../../lib/blockchain-evidence');

let evidenceChain;

if (!evidenceChain) {
  evidenceChain = new BlockchainEvidenceChain();
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const report = evidenceChain.generateEvidenceReport();
    return res.status(200).json(report);
  }

  if (req.method === 'POST') {
    const { type, data } = req.body;
    const evidence = evidenceChain.addEvidence({ type, ...data });
    return res.status(200).json({ success: true, evidence });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

