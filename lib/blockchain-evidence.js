const crypto = require('crypto');

class BlockchainEvidenceChain {
  constructor() {
    this.chain = [];
    this.initializeGenesisBlock();
  }

  initializeGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: { type: 'genesis', message: 'Evidence Chain Initialized' },
      previousHash: '0',
      hash: this.calculateHash(0, new Date().toISOString(), { type: 'genesis' }, '0'),
    };
    this.chain.push(genesisBlock);
  }

  calculateHash(index, timestamp, data, previousHash) {
    const dataString = JSON.stringify(data);
    return crypto
      .createHash('sha256')
      .update(index + timestamp + dataString + previousHash)
      .digest('hex');
  }

  addEvidence(evidenceData) {
    const previousBlock = this.chain[this.chain.length - 1];
    const newIndex = previousBlock.index + 1;
    const newTimestamp = new Date().toISOString();
    const newHash = this.calculateHash(newIndex, newTimestamp, evidenceData, previousBlock.hash);

    const newBlock = {
      index: newIndex,
      timestamp: newTimestamp,
      data: evidenceData,
      previousHash: previousBlock.hash,
      hash: newHash,
    };

    this.chain.push(newBlock);
    return newBlock;
  }

  verifyChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify current block hash
      const calculatedHash = this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash
      );

      if (currentBlock.hash !== calculatedHash) {
        return { valid: false, blockIndex: i, reason: 'Hash mismatch' };
      }

      // Verify previous hash link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return { valid: false, blockIndex: i, reason: 'Previous hash mismatch' };
      }
    }

    return { valid: true, blockCount: this.chain.length };
  }

  generateEvidenceReport() {
    const verification = this.verifyChain();
    const recentEvidence = this.chain.slice(-20);

    return {
      chainLength: this.chain.length,
      verification,
      recentEvidence,
      integrityStatus: verification.valid ? 'INTACT' : 'COMPROMISED',
      lastUpdate: this.chain[this.chain.length - 1]?.timestamp,
      courtReady: verification.valid,
    };
  }

  getEvidenceByType(type) {
    return this.chain.filter(block => block.data.type === type);
  }

  getEvidenceByTimeRange(startTime, endTime) {
    return this.chain.filter(block => {
      const blockTime = new Date(block.timestamp);
      return blockTime >= new Date(startTime) && blockTime <= new Date(endTime);
    });
  }
}

module.exports = BlockchainEvidenceChain;

