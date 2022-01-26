require("dotenv").config()

const { API_URL, PRIVATE_KEY, MYADDRESS, CONTRACT } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = CONTRACT;
const ownerAddress = MYADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    if (!tokenURI) {console.log('error'); return null;}

    const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest'); //get latest nonce

    //the transaction
    const tx = {
      'from': ownerAddress,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(ownerAddress, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    
    signPromise
        .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
            if (!err) {
                console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
                )
            } else {
                console.log(
                "Something went wrong when submitting your transaction:",
                err
                )
            }
            }
        )
        })
        .catch((err) => {
        console.log(" Promise failed:", err)
        })

}

module.exports = { mintNFT }
