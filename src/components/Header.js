'use client'
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from "@/context/WalletContext";

import Image from "next/image";
import Link from "next/link";


export default function Header() {
  // Destrucure 'walletAddress' and 'setWalletAddress' from WalletContext
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  const [displayedWalletAddress, setDisplayedWalletAddress] = useState(null);

  // Define 'connectWallet' function
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            "eth_accounts": {}
          }
        ]
      });
      // console.log("Connected wallet: ", accounts[0].caveats[0].value[0]);
      setWalletAddress(accounts[0].caveats[0].value[0]);
      setDisplayedWalletAddress(`${accounts[0].caveats[0].value[0].slice(0, 7)}...`);
    } catch (error) {
      console.log("Error connecting wallet: ", error);
    }
  }

  // Display the `walletAddress` upon refreshing the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getConnectedWallet = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0){
          console.log("Connected wallet: ", accounts[0]);
          setWalletAddress(accounts);
          setDisplayedWalletAddress(`${accounts[0].slice(0, 7)}...`);
        }
      } catch (error) {
        console.log("Error connecting wallet: ", error);
      }
    };

    getConnectedWallet();
  }, []);

  return (
    <header className="flex flex-col min-[825px]:flex-row justify-between py-5 px-10 border-b-2 border-white bg-white">
      {/* Logo and site title section */}
      <div className="flex flex-row items-scenter mb-5 md:lg-0 md:mr-5">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        <h1 className="ml-5 text-xl font-bold min-[500px]:text-2xl text-black">
          NFT Marketplace
        </h1>
      </div>

      {/* Navigation links section */}
      <div className="flex flex-col items-center max-[900px]:flex-1 min-[500px]:flex-row min-[500px]:justify-between md:text-xl">
        <div className="flex justify-between flex-1 text-md font-bold text-black">
          <Link href="/" className="min-[900px]:px-3">
            Home
          </Link>
          <a href="/mint-nft/" className="min-[900px]:px-3">
            Mint NFT
          </a>
          <Link href="/my-nft" className="min-[900px]:px-3">
            My NFT
          </Link>
          <Link href="#" onClick={connectWallet} className="block py-1 px-3 ml-2 rounded-md font-bold text-lg bg-blue-500 text-white">
            {displayedWalletAddress ? displayedWalletAddress : "Connect Wallet"}
          </Link>
        </div>
      </div>
    </header>
  );
}