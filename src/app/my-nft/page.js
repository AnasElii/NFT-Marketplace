'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import NFTCard from "@/components/NFTCard";


export default function Home() {

  const [data, updateData] = useState([]);

  const getAllNFTs = async () => {
    console.log("Function called");
    try {

      // Check if the browser has Metamask installed
      if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {

        // const response = await axios.post("/api/nft");
        const NFTs = await axios.post("http://localhost:4000/api/fetchNFTsQuery");
        console.log("NFTs", NFTs.data.NFT.data.nfts);
        let items = NFTs.data.NFT.data.nfts;

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
    <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
      {data.length > 0 ? (
        data.map((item) => {
          return <NFTCard key={item.id} data={item} />
        })
      ) : (
        <p>No NFT listed</p>
      )}
    </div>
  );
}
