class UTXO {
  constructor(owner, amount) {
    this.owner = owner;
    this.amount = amount;
    this.spent = false;
  }
}

module.exports = UTXO;
