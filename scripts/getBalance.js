const client = require('./client');
const {argv} = require('yargs');
const {address} = argv;

client.request('getBalance', [address], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
