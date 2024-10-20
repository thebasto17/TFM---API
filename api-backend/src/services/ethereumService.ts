import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet("privateKey", provider);

export const mintTokens = async (contractAddress: string, toAddress: string) => {
    const contract = new ethers.Contract(contractAddress, erc20Abi, wallet);
    const tx = await contract.mint(toAddress, ethers.parseUnits("1", 18));
    await tx.wait();
    console.log(`Minted tokens to ${toAddress}`);
}