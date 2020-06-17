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
}

module.exports = Blockchain;
