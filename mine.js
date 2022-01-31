const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;
const MAX_TRANSACTIONS = 10;
const mempool = [];

let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function addTransaction(tx) {
  mempool.push(tx)
}

function mine() {
  if(!mining) return;
  
  const block = new Block(db.blockchain.lastHash());
  
  const blockFees = mempool.map(x => x.getFee()).reduce((a,b) => a + b, 0);

  while ((mempool.length > 0) & (block.transactions.length < MAX_TRANSACTIONS)) {
    block.addTransaction(mempool.pop());
  }

  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD + blockFees);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  block.execute();

  db.blockchain.addBlock(block);

  console.log(`
  Mined block #${db.blockchain.blockHeight()}, 
  hash: ${block.hash()}, 
  nonce: ${block.nonce}, 
  previous hash: ${block.previousHash}, 
  transactions: ${JSON.stringify(block.transactions)}`);

  setTimeout(mine, 2500);
}

module.exports = {
  startMining,
  stopMining,
  addTransaction
};
