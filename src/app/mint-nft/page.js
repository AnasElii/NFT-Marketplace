'use client';
import React, { useState, useContext } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { WalletContext } from "@/context/WalletContext";



export default function MintNFT() {

  const { walletAddress } = useContext(WalletContext);

  const [nftData, setNftData] = useState({
    name: "",
    price: ""
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info('Minting NFT...', {
      autoClose: 1000,
    });

    if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {

      if (walletAddress > 0) {

        const provider = new ethers.BrowserProvider(window.ethereum);

        try {
          const formData = new FormData();
          formData.append("name", nftData.name);
          formData.append("price", nftData.price);
          formData.append("file", file);

          let res = await axios.post('/api/mint-nft', formData);

          const NFT_URI = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
          const signer = await provider.getSigner();
          const balance = await provider.getBalance(signer);
          const NFTPriceInWei = ethers.parseEther(nftData.price);

          if (NFTPriceInWei <= balance) {
            const contract = new ethers.Contract(
              process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS,
              NFTMarketplace.abi,
              signer
            );
            const listingPrice = await contract.listingPrice();
            console.log("Listing Price:", listingPrice);

            let transaction = await contract.mintNFT(
              NFT_URI,
              NFTPriceInWei,
              { value: listingPrice }
            );

            // Wait for the 'transaction' to be completed
            await transaction.wait();

            if(transaction){
              toast.success(`Transaction complete with success!`);
            }

          } else {
            toast.error("Not enoth ether provided!");
          }

        } catch (error) {
          toast.error(`Error minting NFT ${error.message}`);
        }
      } else {
        toast.warn(`Connect your wallet`);
      }

    } else {
      toast.error("Metamask not installed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Create NFT</h1>
      <form
        className="border-2 border-sky-900 rounded-md flex flex-col justify-around items-center min-h-max p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center mt-10">
          <label htmlFor="name" className="text-xl font-bold text-white">NFT Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="min-w-full mt-3 rounded min-h-[35px] text-black p-2 border-2 border-sky-900"
            vlaue={nftData.name}
            onChange={(e) => {
              setNftData({ ...nftData, name: e.target.value });
            }}
          />
          <label htmlFor="name" className="text-xl font-bold text-white">NFT Image <span className="text-red-700">*</span>
          </label>
          <input
            type="file"
            name='image'
            id='image'
            className="min-w-full mt-3 rounded min-h-[35px] text-black p-2 file:bg-white file:text-sky-900 file:font-semibold file:rounded file:mr-2 file:py-1 file:px-2 file:border-0 file:border-rounded"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="name" className="text-xl font-bold text-white">NFT Price <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="min-w-full mt-3 rounded min-h-[35px] text-black p-2 border-2 border-sky-900"
            vlaue={nftData.price}
            onChange={(e) => {
              setNftData({ ...nftData, price: e.target.value });
            }} />

          <button id="submit" type="submit" className="min-w-full mt-3 bg-blue-500 rounded min-h-[35px] text-black p-2">Create NFT</button>
        </div>
      </form>
    </div>
  );
}
