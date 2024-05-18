'use client'
import { createContext, useState } from 'react'

// Create a context wallet 
export const WalletContext = createContext();

// Create the wallet procider
export function WalletProvider({ children }) {
    const [walletAddress, setWalletAddress] = useState(null);

    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    )
}
