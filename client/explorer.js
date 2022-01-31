import "./explorer.scss";

document.getElementById("get-block").addEventListener('click', () => {
  const params = {
    method: "getBlock",
    params: [document.getElementById("blockNumber").value],
    jsonrpc: "2.0",
    id: 1
  }
  const request = new Request('http://localhost:3032/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(({result}) => {
      console.log(result)
      block = JSON.parse(result);
      let date = new Date(block.timestamp);
      let formattedTime = date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
      document.getElementById("timestamp").innerHTML = formattedTime;
      document.getElementById("nonce").innerHTML = block.nonce;
      
      let txList = "";
      let txn = 0;
      for (let tx of block.transactions) {
        let inputList = "";
        for (let input of tx.inputs) {
          inputList += `<li>${input.owner}: ${input.amount}</li>\n`
        }
        let inputHtml = `<ul>${inputList}</ul>`

        let outputList = "";
        for (let output of tx.outputs) {
          outputList += `<li>${output.owner}: ${output.amount}</li>\n`
        }
        let outputHtml = `<ul>${outputList}</ul>`

        txList += `<div><h3>Transaction ${txn}</h3><li>Inputs<div id="inputs">${inputHtml}</div>Outputs<div id="outputs">${outputHtml}</div></li></div>\n`;
        txn++;
      }
      let txHtml = `<ul>${txList}</ul>`
      document.getElementById("transactions").innerHTML = txHtml;
      console.log(txHtml)
    });
});
