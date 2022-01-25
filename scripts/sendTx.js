require('dotenv').config();
const env = require('hardhat');
const argv = require('minimist')(process.argv.slice(2));

async function sendTx(myAddress, toAddress, ethAmount, gasFee) {
    
    const { API_URL, PRIVATE_KEY } = process.env;

    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0
    
    const transaction = {
     'to': toAddress,
     'value': ethAmount * 1000000000000000000, // 10^18 wei = 1 ETH
     'gas': gasFee,
     'nonce': nonce,
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

const validKeys = ['h','help','f','from','t','to','a','amount','g','gasfee','_'];
const { MYADDRESS, TOADDRESS } = process.env;

if (argv['h'] || argv['help']) {
  console.log(
`Usage:
- h or --help     : prints this message
- f or --from     : from address; defaults to env.MYADDRESS
- t or --to       : to address; defaults to env.TOADDRESS
- a or --amount   : ETH amount to be sent
- g or --gasfee   : gas fee; defaults to 30000
`);
} else if (!argv['a'] && !argv['amount']) {
  console.log(`ERROR: ETH amount must be specified with -a or --amount tags.`)
} else if (! Object.keys(argv).every(k => validKeys.includes(k))) {
  console.log(`ERROR: unrecognized parameter key(s) [${Object.keys(argv).filter(k => !validKeys.includes(k))}].`)
} else {
  const tx = {
    from: argv['f'] || argv['from'] || MYADDRESS,
    to: argv['t'] || argv['to'] || TOADDRESS,
    amount: argv['a'] || argv['amount'],
    gasFee: argv['g'] || argv['gasfee'] || 30000
  }
  console.log(tx);
  sendTx(tx.from, tx.to, tx.amount, tx.gasFee)
}
