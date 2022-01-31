const client = require('./client');
const {argv} = require('yargs');
const {blockNumber} = argv;

client.request('getBlock', [blockNumber], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
