class Blockchain {
  constructor() {
    this.blocks = [];
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length;
  }
  lastHash() {
    if (this.blockHeight() > 0) {
      return this.blocks[this.blockHeight()-1].hash();
    } else {
      return 0;
    }
  }
}

module.exports = Blockchain;
