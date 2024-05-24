'use client'
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import axios from "axios";

import NFTMarketplace from "/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import { WalletContext } from "@/context/WalletContext";
import NFTCard from "@/components/NFTCard";


export default function Home() {

  const [data, updateData] = useState([]);

  const getAllNFTs = async () => {
    console.log("Function called");
    try {

      if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS,
          NFTMarketplace.abi,
          signer
        );

        const nftsList = await contract.getAllNFTs();

        let items = await Promise.all(nftsList.map(async (item) => {
          const tokenURI = await contract.tokenURI(item.id);
          let res = await axios.get(tokenURI);
          const metadata = res.data;
          console.log(metadata)
          const NFT = {
            id: item.id,
            name: metadata.name,
            owner: item.owner,
            price: metadata.price,
            img: metadata.img
          }
          return NFT;
        })
        );

        updateData(items);
      } else {
        toast.error("Metamask not installed");
      }

    } catch (e) {
      toast.error("Error fetching NFTs", e.message);
    }


  };

  useEffect(() => {
    getAllNFTs();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center">
      {/* <Image src="/logo.svg" width={64} height={64} alt="Logo" />
      <h1 className="text-3xl font-bold text-white">Welcome to NFT Marketplace</h1> */}

      <div class="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        {data.map((item) => {
          return <NFTCard data={item} />
        })}
      </div>

    </div>
  );
}
