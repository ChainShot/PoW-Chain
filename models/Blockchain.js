class Blockchain {
  constructor() {
    this.blocks = [];
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length - 1;
  }
  lastHash() {
    if (this.blockHeight() > 0) {
      return this.blocks[this.blockHeight()].hash();
    } else {
      return 0;
    }
  }
  getBlock(blockNumber) {
    if (blockNumber <= this.blockHeight()) {
      return this.blocks[blockNumber];
    } else {
      return null;
    }
  }
}

module.exports = Blockchain;
