const { ethers } = require("hardhat");

async function getInitializedContract() {
    
    const Counters = await ethers.getContractFactory("Counters");
    const counters = await Counters.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace", {
        libraries:
        {
            Counters: counters,
        }
    });
    const marketplace = await NFTMarketplace.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    
    const listingPrice = await marketplace.listingPrice();
    const accounts = await ethers.getSigners();

    return { marketplace, accounts, listingPrice };
}

const NFTDetails= {
    URI: "URI",
    price: 6
}

module.exports = { getInitializedContract, NFTDetails }