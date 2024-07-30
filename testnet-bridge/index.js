require('dotenv').config();
const { ethers } = require("ethers");

console.log('ALCHEMY_ENDPOINT:', process.env.ALCHEMY_ENDPOINT);
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Loaded' : 'Not Loaded');

const ALCHEMY_ENDPOINT = process.env.ALCHEMY_ENDPOINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// This is for Blast Sepolia Testnet, not Blast mainnet
const BlastBridgeAddress = "0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8";

// Providers for Sepolia and Blast networks
try {
    const sepoliaProvider = new ethers.providers.JsonRpcProvider(ALCHEMY_ENDPOINT);
    const blastProvider = new ethers.providers.JsonRpcProvider("https://sepolia.blast.io");

    // Wallet setup
    const wallet = new ethers.Wallet(PRIVATE_KEY);
    const sepoliaWallet = wallet.connect(sepoliaProvider);
    const blastWallet = wallet.connect(blastProvider);

    async function main() {
        // Transaction to send 0.1 Sepolia ETH
        const tx = {
            to: BlastBridgeAddress,
            value: ethers.utils.parseEther("0.5")
        };

        const transaction = await sepoliaWallet.sendTransaction(tx);
        await transaction.wait();

        // Confirm the bridged balance on Blast
        const balance = await blastProvider.getBalance(wallet.address);
        console.log(`Balance on Blast: ${ethers.utils.formatEther(balance)} ETH`);
    }

    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
} catch (error) {
    console.error('Error setting up providers:', error);
}



