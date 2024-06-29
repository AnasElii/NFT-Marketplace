'use client';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import * as ethers from 'ethers';
import { toast } from 'react-toastify';
import { WalletContext } from '@/context/WalletContext';
import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

export default function MintNFT() {

  const { walletAddress } = useContext(WalletContext);

  const [nftData, setNftData] = useState({
    name: "",
    description: "",
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

          const isValidAddress = ethers.isAddress(walletAddress[0].toLowerCase());
          if (!isValidAddress) {
            console.error("Invalid Ethereum address:", isValidAddress);
            return toast.error("Invalid Ethereum address");
          }

          const signer = await provider.getSigner();
          const balance = await provider.getBalance(signer);
          const NFTPriceInWei = ethers.parseEther(nftData.price);


          // Checking the balance
          if (NFTPriceInWei >= balance) {
            return toast.error("Insufficient Funds");
          }

          const formData = new FormData();
          formData.append("name", nftData.name);
          formData.append("description", nftData.description);
          formData.append("price", nftData.price);
          formData.append("image", file);

          const response = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/mintNFT`, formData);

          if (response.status === 200) {
            // toast.success(`Transaction complete with success!`);
            console.log("Data from IPFS: ", response.data);
          }

          const { NFT_URI, listingPriceInEther } = response.data;
          const listingPrice = ethers.parseEther(listingPriceInEther);

          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS,
            NFTMarketplace.abi,
            signer
          );

          // Minting the NFT
          let transaction = await contract.mintNFT(
            NFT_URI,
            NFTPriceInWei,
            { value: listingPrice }
          );

          await transaction.wait();

          if (transaction) {
            return toast.success("NFT Minted Successfully");
          }

        } catch (error) {
          toast.error(`Error minting NFT ${error.message}`);
          console.error("Error minting NFT: ", error);
        }
      } else {
        toast.warn(`Connect your wallet`);
        console.error("Wallet not connected");
      }

    } else {
      toast.error("Metamask not installed");
      console.error("Metamask not installed");
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
          <label htmlFor="description" className="text-xl font-bold text-white">NFT Description <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="min-w-full mt-3 rounded min-h-[35px] text-black p-2 border-2 border-sky-900"
            vlaue={nftData.description}
            onChange={(e) => {
              setNftData({ ...nftData, description: e.target.value });
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
