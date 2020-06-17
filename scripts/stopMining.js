const client = require('./client');

client.request('stopMining', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});
