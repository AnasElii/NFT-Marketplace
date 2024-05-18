# NFT Marketplace

![NFT Marketplace screenshot](https://i.imgur.com/YttaPcE.png)

The following is a UML sequence diagram of the project
![Marketplace Diagram](https://github.com/AnasElii/NFT-Marketplace/assets/57045844/e4f37db4-157b-4ce8-8e15-153e2623bd9c)


## Overview

NFT Marketplace is a full-stack decentralized application (dApp) designed to create a cost-efficient and secure marketplace for Non-Fungible Tokens (NFTs). This project integrates both centralized and decentralized backends to optimize cost without compromising security. The smart contracts used in this project are developed with a focus on cost efficiency while ensuring the security of the marketplace. Additionally, this project serves as an educational resource for anyone interested in learning about building dApps and NFT marketplaces.

## Features

- **Decentralized and Centralized Backend**: Combines the strengths of both decentralized and centralized systems to balance cost and performance.
- **Cost-Efficient Smart Contracts**: Designed to minimize gas fees and other costs associated with blockchain transactions.
- **Secure Transactions**: Emphasis on maintaining the security and integrity of the NFT store.
- **Technology Stack**: Utilizes Next.js and JavaScript for the frontend, PHP for the backend, and various databases, including MySQL, to manage and store data efficiently.

## Technology Stack

- **Frontend**: Next.js, JavaScript
- **Backend**: PHP, InterPlanetary File System
- **Databases**: MySQL and other centralized and decentralized database solutions
- **Blockchain**: Smart contracts developed using Hardhat and OpenZeppelin, deployed on a blockchain platform

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nft-marketplace.git
   cd nft-marketplace
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root directory.
   - Visit `Pinata Cloud` to sign up for a new free account.

   - add the `PINATA_JWT_TOKEN` and `NEXT_PUBLIC_NFT_MARKETPLACE_ADDRESS` fields
  
   - Add necessary configuration settings (database credentials, blockchain network settings, etc.).
  
4. **Run the Hardhat Nood**
   If you are going to deploy the smart contract to a hardhat local network
   deploy it in the port 3000
   `npx hardhat node --hostname 0.0.0.0 --port 3000`

1. **Run the Application**
   ```bash
   npm run dev
   ```

## Usage

1. **Deploy Smart Contracts**
  Follow the instructions in the `contracts/` directory to deploy smart contracts using Hardhat and OpenZeppelin to your preferred blockchain network.
  

1. **Start the Backend Server**
   Ensure your PHP server is configured correctly and running.


1. **Access the Marketplace**
   - Open your browser and navigate to `http://localhost:3001` to start using the NFT Marketplace.

## Educational Resource

This project is designed to be an educational resource. Whether you are a beginner or an experienced developer, you can use this project as a starting point to learn about building decentralized applications and NFT marketplaces.

## Contributing

We welcome contributions to enhance the NFT Marketplace. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request to the `main` branch.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or feedback, please open an issue on GitHub or reach out to us directly.

---

We hope you enjoy using the NFT Marketplace! If you have any suggestions or encounter any issues, please don't hesitate to let us know.
