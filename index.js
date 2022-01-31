const {startMining, stopMining, addTransaction} = require('./mine');
const {PORT} = require('./config');
const {utxos, blockchain} = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const UTXO = require('./models/UTXO');
const Transaction = require('./models/Transaction');


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const getUTXOsByAddress = (address) => {
  return utxos.filter(x => {
    return x.owner === address && !x.spent;
  });
}
const getBalance = (address) => {
  return getUTXOsByAddress(address).reduce((p,c) => p + c.amount, 0);
}

app.post('/', (req, res) => {
  const {method, params} = req.body;
  if(method === 'startMining') {
      startMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === 'stopMining') {
      stopMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === "getBalance") {
      const [address] = params;
      const sum = getBalance(address);
      res.send({ balance: sum.toString()});
  }
  if(method === 'addTransaction') {
    let [from, to, amount, fee] = params;
    if (amount + fee <= getBalance(from)) {
      inputs = getUTXOsByAddress(from);
      outputs = [new UTXO(to, amount), new UTXO(from, getBalance(from) - amount - fee)];
      addTransaction(new Transaction(inputs, outputs));
      res.send({result: "Success"});
    } else {
      res.send({result: "Not enough funds."});
    }
    
    return;
}
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
