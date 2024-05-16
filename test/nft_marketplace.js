const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("NFT Marketplace", function(){
    async function initialize(){
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        
        const counters = await ethers.deployContract("Counters");
        
        const marketplace = await ethers.ContractFactory("NFT_Marketplace",{
            libraries:{
                Counters: counters,
            },
        });

        return { marketplace, owner, addr1, addr2, addr3};
    }

    it("Shold mint nft", async function(){
        const {marketplace, owner, addr1, addr2, addr3} =await loadFixture(initialize);
    });
});