'use client';
import { useContext } from 'react';
import axios from "axios";
import BigNumber from 'bignumber.js';
import FormData from 'form-data';

import Image from "next/image";
import { WalletContext } from "@/context/WalletContext";
import { toast } from "react-toastify";

const ipfsGateway = 'https://ipfs.io/ipfs/';

function weiToEther(wei) {
    const weiBN = new BigNumber(wei);
    const etherBN = weiBN.dividedBy(new BigNumber('1000000000000000000'));
    return etherBN.toString();
}

function imageURI(fullURI) {
    const cid = fullURI.replace('ipfs://', '');
    return ipfsGateway + cid
}

export default function NFTCard(data) {

    const { walletAddress } = useContext(WalletContext);
    // const walletAddressLowerCase = walletAddress.toLowerCase();

    const { id, nftID, name, description, owner, price, image } = data.data;

    let imgURL = imageURI(image);
    const ownerAddress = owner.toLowerCase();
    const walletOwnerAddress = walletAddress !== null ? walletAddress[0].toLowerCase() : 0;
    const PriceInEther = weiToEther(price);

    let buttonText = "Connect Wallet";
    if (walletAddress > 0) {
        buttonText = ownerAddress === walletOwnerAddress ? "Owned" : "Buy Now";
    } else {
        buttonText = "Connect Wallet";
    }

    async function buyNFT() {
        try {
            if (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined') {
                if (walletAddress > 0) {

                    const formData = new FormData();
                    formData.append('owner', owner);
                    formData.append('price', PriceInEther);
                    formData.append('id', nftID);

                    try {
                        const response = await axios.post(`http://localhost:4000/api/buyNFT`, formData); // Step 2 & 3: Verify endpoint and formData
                        console.log(response.data); // Assuming the response contains the data you need
                    } catch (error) {
                        console.error('Error Sending Request:', error.response ? error.response.data : error.message); // Step 4: Improved error handling
                    }

                    if (!response.status === 200) {
                        toast.error(`Error buying NFT: ${response.statusText}`);
                        console.log("Error buying NFT: ", response.statusText);
                    }

                    toast.success(`Transaction complete with success!`);
                } else {
                    toast.error("Connect Wallet to buy NFT");
                }
            } else {
                toast.error("Metamask not installed");
            }

        } catch (error) {
            toast.error("Error buying NFT", error.message);
            console.error("Error buying NFT: ", error)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center">
            <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                    <h3 class="mb-3 text-xl font-bold text-white bg-indigo-600 py-1 rounded-xl ">{nftID}</h3>
                    <h3 class="mb-3 text-xl font-bold text-indigo-600">{id}</h3>
                    <div className="relative h-[300px]">

                        <Image
                            className="w-full rounded-xl"
                            src={imgURL}
                            fill
                            alt="Image of the NFT"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                            {`${PriceInEther} ETH`}
                        </p>
                    </div>

                    <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{`${name}`}</h1>
                    <div className="my-4 text-black">
                        <div className="flex space-x-1 items-center">
                            <span className="font-semibold">Owner: </span>
                            <p>{owner.substring(0, 7) + "..."}</p>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <span className="font-semibold">Price: </span>
                            <p>{PriceInEther} ETH</p>
                        </div>
                        <button onClick={buyNFT} class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                            disabled={ownerAddress === walletOwnerAddress ? true : false}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>

        </div>

    )

}

