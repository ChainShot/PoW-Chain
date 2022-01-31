const {utxos} = require('../db');

class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  execute() {
    this.inputs.forEach((input) => {
      input.spent = true;
    });
    this.outputs.forEach((output) => {
      utxos.push(output);
    });
  }
  getFee() {
    return this.inputs.reduce((p,c) => p + c.amount, 0) - this.outputs.reduce((p,c) => p + c.amount, 0);
  }
}

module.exports = Transaction;
