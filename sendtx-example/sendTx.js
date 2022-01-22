require('dotenv').config();

async function sendTx(myAddress, toAddress, ethValue, gasFee = 30000) {
    
    const { API_URL, PRIVATE_KEY } = process.env;

    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0
    
    const transaction = {
     'to': toAddress,
     'value': ethValue * 1000000000000000000, // 10^18 wei = 1 ETH
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

const { MYADDRESS, TOADDRESS } = process.env;

sendTx(MYADDRESS, TOADDRESS, 0.03, 30000)
