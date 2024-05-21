const { getInitializedContract } = require("./constants");

async function main() {
    const { marketplace, accounts, listingPrice } = await getInitializedContract();

    // Interact with the smart contract
    const nftsList = await marketplace.getAllNFTs();
    console.log("Lists", nftsList[0].id);
    console.log("Lists", nftsList[1].id);
    console.log("Lists", nftsList[2].id);
    // console.log("Lists", nftsList[3].id);
    const nftIds = await marketplace.getNFTIDs();
    console.log("IDs", nftIds);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });