'use client';
import { useContext } from 'react';
import Image from "next/image";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { toast } from "react-toastify";

export default function NFTCard(data) {

    const { walletAddress } = useContext(WalletContext);
    // const walletAddressLowerCase = walletAddress.toLowerCase();
    let imgURL = 'https://ipfs.io/ipfs/' + data.data.img;
    const ownerAddress = data.data.owner.toLowerCase();
    let buttonText = "Connect Wallet";
    if (walletAddress > 0) {
        buttonText = data.data.owner.toLowerCase() === walletAddress[0].toLowerCase() ? "Owned" : "Buy Now";
    }

    async function buyNFT() {
        console.log("Buying NFT");
        try {
            if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {
                if (walletAddress > 0) {

                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const balance = await provider.getBalance(signer);
                    const NFTPriceInWei = ethers.parseEther(data.data.price);

                    if (NFTPriceInWei <= balance) {

                        const contract = new ethers.Contract(
                            process.env.NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS,
                            NFTMarketplace.abi,
                            signer
                        );

                        let transaction = await contract.buyNFT(
                            data.data.id,
                            { value: NFTPriceInWei }
                        )

                        await transaction.wait();

                        if (transaction) {
                            toast.success(`Transaction complete with success!`);
                        }

                    }
                } else {
                    toast.error("Metamask not installed")
                }
            } else {
                toast.error("Connect Wallet to buy NFT");
            }


        } catch (error) {
            toast.error("Error buying NFT", error.message);
        }
    }

    return (

        <div className="flex flex-col items-center justify-center">
            <div class="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                    {/* <h3 class="mb-3 text-xl font-bold text-indigo-600">Intermediate</h3> */}
                    <div class="relative  h-[300px]">
                        <Image class="w-full rounded-xl" src={imgURL} fill alt="Image of the NFT" />
                        <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{`${data.data.price} ETH`}</p>
                        {/* <p class="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">%20 Discount</p> */}
                    </div>
                    <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{`${data.data.name}`}</h1>
                    <div class="my-4 text-black">
                        {/* <div class="flex space-x-1 items-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <p>1:34:23 Minutes</p>
                        </div> */}
                        <div class="flex space-x-1 items-center">
                            <span className="font-semibold">Owner: </span>
                            <p>{data.data.owner.substring(0, 7) + "..."}</p>
                        </div>
                        <div class="flex space-x-1 items-center">
                            <span className="font-semibold">Price: </span>
                            <p>{data.data.price} ETH</p>
                        </div>
                        <button onClick={buyNFT} class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                            disabled={data.data.owner.toLowerCase() === walletAddress[0].toLowerCase() ? true : false}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )

}

