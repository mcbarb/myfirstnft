const fs = require('fs');

function createNftMetadata(id, name, description, imageURI, otherAttributes = {}) {
    const metadata = {
        id,
        description, 
        name,
        image: imageURI,
        attributes: otherAttributes
    }
    fs.writeFile(
        `./metadata/nft-${id.toString().padStart(3,0)}.json`,
        JSON.stringify(metadata, null, 4),
        {encoding: 'utf8', flag: 'wx'},
        (err) => {
            if (err) throw err;
            console.log("Successfully saved new NFT metadata!");
        }
    )
}