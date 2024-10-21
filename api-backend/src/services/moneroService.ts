import moneroTs from "monero-ts";

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
          const mappings = [
            {
              address: "0x123123",
              randomNumber: 9999799999,
              assetPrice: 100000000000000,
              amountToTransfer: 120000000000000,
            },
            {
              address: "0x444444",
              randomNumber: 0,
              assetPrice: 10000000000000,
              amountToTransfer: 10000000000000,
            },
          ]; //getAllMappings()
          mappings.forEach((mapping) => {
            if (isMatchingTransaction(Number(txAmount), mapping)) {
              // 1. Trigger Smart Contract minting
              // 2. Delete mapping
            }
          });
        }
      }
    })()
  );
}

function isMatchingTransaction(txAmount: number, mapping: any) {
  const randomNumberFromTx = Math.round((Number(txAmount) - mapping.assetPrice) * 10e11);
  return randomNumberFromTx === mapping.randomNumber;
}