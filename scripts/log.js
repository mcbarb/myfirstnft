const { createNftMetadata } = require('./create-nft');
const { mintNFT } = require('./mint-nft');

// NFT #001
// Error

// Cacau #002
// manually created JSON
// mintNFT('https://gateway.pinata.cloud/ipfs/QmVRmzMHtEbupoATSoP4cYbpERvxgjr9yZc1mHLF9m3k5Z')

// Tubára #003
// createNftMetadata(
//     3,
//     "Tubára", 
//     "Drawing of Tubára, ficticious character that save olives from food poisoning.",
//     "https://gateway.pinata.cloud/ipfs/QmafJaXiBhr3SeJbqWvM7Ya8YVU9q46ZWucNHvw8qPHZ6g",
//     {'power': 'green apple', cerro: 'Chapelco', city: 'San Martin de Los Andes', country: 'Argentina', 'year': 2007}
// )
// mintNFT('https://gateway.pinata.cloud/ipfs/QmboJkUzSAYEpYgTumZBG9sRyXZ78jjP8GrokxiFkSwWs2')

// Tasha + Pateta #004
// createNftMetadata(
//         4,
//         "Tasha + Pateta", 
//         "Amateur drawing of Tasha and Pateta, two fictional characters from Backyardigans and Disney.",
//         "https://gateway.pinata.cloud/ipfs/QmS68wFqSjPnLxidXjr5TzRE5vGGR9SZkFvT9YBtu5aESM",
//         {
//             "characters": "Tasha and Pateta",
//             "drawing_type": "pencil",
//             "author": "not famous and clearly not talented",
//             "country": "Brazil",
//             "date": "December 2021"
//         }
//     )
// mintNFT('https://gateway.pinata.cloud/ipfs/QmVPCCXm35t3yiCHMuP45doYePvAGZzFE18px3gT4B5G1w')