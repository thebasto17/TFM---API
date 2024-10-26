import moneroTs from "monero-ts";
import {deleteMapping, listMappings, updateMapping} from "./addressMappingService";
import { mintTokens } from "./ethereumService";
import AddressMapping, { IAddressMapping } from "../models/addressMapping";

export async function loadWallet() {
  return moneroTs.openWalletFull({
    path: "./wallets",
    password: process.env.WALLET_PASSWORD,
    networkType: moneroTs.MoneroNetworkType.STAGENET,
    server: {
      uri: process.env.STAGENET_MONERO_NODE,
    },
  });
}

export async function monitorWallet(wallet: moneroTs.MoneroWalletFull) {
  await wallet.addListener(
    new (class extends moneroTs.MoneroWalletListener {
      async onOutputReceived(output: moneroTs.MoneroOutputWallet) {
        let txAmount = output.getAmount();
        let txHash = output.getTx().getHash();
        let isConfirmed = output.getTx().getIsConfirmed();
        let isLocked = output.getTx().getIsLocked();

        if (isConfirmed && isLocked) {
          const mappings = await listMappings();
          mappings.forEach(async (mapping: IAddressMapping) => {
            if (isMatchingTransaction(Number(txAmount), mapping)) {
              // 1. Trigger Smart Contract minting
              await mintTokens(mapping.erc20Address, mapping.ethereumAddress);
              // 2. Delete mapping
              const updatedMapping: IAddressMapping = mapping;//new AddressMapping({...mapping, minted:true});
              await updateMapping(mapping.randomNumber.toString(), updatedMapping);
            }
          });
        }
      }
    })()
  );
}

function isMatchingTransaction(txAmount: number, mapping: any) {
  const randomNumberFromTx = Math.round((Number(txAmount) - Number(mapping.assetPrice)) * 10e11);
  return randomNumberFromTx === Number(mapping.randomNumber);
}
