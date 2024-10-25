import { ethers } from 'ethers';
import ERC20ABI from "../abis/ERC20Token.json";

const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const private_key = process.env.PRIVATE_KEY ?? '';
const wallet = new ethers.Wallet(private_key, provider);

export const mintTokens = async (contractAddress: string, toAddress: string) => {
    try {
        const contract = new ethers.Contract(contractAddress, ERC20ABI, wallet);
        const tx = await contract.mint(toAddress, ethers.parseUnits("1", 18));
        await tx.wait();
        console.log(`Minted tokens to ${toAddress}`);
    } catch (error) {
        console.log('Error miniting tokens: ', error);
    }
}