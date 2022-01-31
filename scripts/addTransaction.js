const client = require('./client');
const {argv} = require('yargs');
// const {inputs, outputs} = argv;
const from = "049a1bad614bcd85b5f5c36703ebe94adbfef7af163b39a9dd3ddbc4f286820031dfcb3cd9b3d2fcbaec56ff95b0178b75d042968462fbfe3d604e02357125ded5";
const to = "049a1bad614bcd85b5f5c36703ebe94adbfef7af163b39a9dd3ddbc4f286820031dfcb3cd9b3d2fcbaec56ff95b0178b75d042968462fbfe3d604e02357125ded4"
const amount = 5;
const fee = 1;

client.request('addTransaction', [from, to, amount, fee], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
