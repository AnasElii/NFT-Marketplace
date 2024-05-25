const { ethers } = require("hardhat");

async function getInitializedContract() {
    
    const Counters = await ethers.getContractFactory("Counters");
    const counters = await Counters.attach("0xa37753C917ca518f2F31C36C34E0a2c8Cf52CcA6");
    
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace", {
        libraries:
        {
            Counters: counters,
        }
    });
    const marketplace = await NFTMarketplace.attach("0x96dE6b49A3a0bFD06FccaB3e0327d88Cc4FDD00f");
    
    const listingPrice = await marketplace.listingPrice();
    const accounts = await ethers.getSigners();

    return { marketplace, accounts, listingPrice };
}

const NFTDetails= {
    URI: "URI",
    price: 6
}

module.exports = { getInitializedContract, NFTDetails }