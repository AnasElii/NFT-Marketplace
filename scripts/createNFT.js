const { getInitializedContract, NFTDetails } = require("./constants");

async function main() {
    const { marketplace, accounts, listingPrice } = await getInitializedContract();

    // Interact with the smart contract
    await marketplace.connect(accounts[1]).mintNFT(
        NFTDetails.URI,
        NFTDetails.price,
        { value: listingPrice }
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });