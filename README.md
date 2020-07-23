# Proof of Work Chain

This is an example Proof of Work Chain with a client/server application.

## Server

First you'll want to start the server. You'll want to install all the dependencies with `npm i` from the root directory in the terminal.

Once you've installed the dependencies you can run the server with `node index` or `nodemon index` (the latter of which will restart the server if you make any changes!). This currently starts your server at port `3032` by default.

## Client

To start the client application you'll need to install [parceljs](https://parceljs.org/getting_started.html).

Once you have done that you can navigate to the `/client` folder in a terminal and run `parcel index.html` which will start your client at port `1234` by default.

## Utilities

There are some `/scripts/` which you can use as utilities for your Proof of Work chain. Inside the scripts folder you'll find a few files:

- `generate.js` - This will generate you a new public/private keypair `node generate`
- `getBalance.js` - This will get the balance of a public key passed in from the command line: i.e. `node getBalance --address 049a1bad614bcd85b5f5c36703ebe94adbfef7af163b39a9dd3ddbc4f286820031dfcb3cd9b3d2fcbaec56ff95b0178b75d042968462fbfe3d604e02357125ded5`
- `startMining.js` - This will start the miner on the server `node startMining`
- `stopMining.js` - This will stop the miner on the server `node stopMining`
