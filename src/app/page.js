'use client'
import { useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import NFTMarketplace from "/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function Home() {

  const getAllNFTs = async () =>{
    console.log("Function called");
    if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS,
        NFTMarketplace.abi,
        signer
      );

      const transaction = await contract.getAllNFTs();
      
      // transaction.forEach( NFT => {
        
      //   // console.log(NFT);

      //   const tokenURI = contract.tokenURI(NFT.id);
      //   console.log("NFT URI", tokenURI);
      // });
        let i = 0;
        while(true){
          console.log("URI", contract.tokenURI(i));
        
          if( i == 5 )
            break;
        
          i++;
        }

    } else {
      toast.error("Metamask not installed");
    }
  };

  useEffect(()=>{
    getAllNFTs();
  },[]);


  return (

    <div className="flex flex-col items-center justify-center">
      <Image src="/logo.svg" width={64} height={64} alt="Logo" />
      <h1 className="text-3xl font-bold text-white">Welcome to NFT Marketplace</h1>
    </div>

  );
}
