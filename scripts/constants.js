const { ethers } = require("hardhat");

async function getInitializedContract() {
    
    const Counters = await ethers.getContractFactory("Counters");
    const counters = await Counters.attach("0x610178dA211FEF7D417bC0e6FeD39F05609AD788");
    
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace", {
        libraries:
        {
            Counters: counters,
        }
    });
    const marketplace = await NFTMarketplace.attach("0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e");
    
    const listingPrice = await marketplace.listingPrice();
    const accounts = await ethers.getSigners();

    return { marketplace, accounts, listingPrice };
}

const NFTDetails= {
    URI: "URI",
    price: 6
}

module.exports = { getInitializedContract, NFTDetails }