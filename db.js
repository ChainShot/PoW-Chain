const Blockchain = require('./models/Blockchain');

const db = {
  blockchain: new Blockchain(),
  utxos: [],
}

module.exports = db;
