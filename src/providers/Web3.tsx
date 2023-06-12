import React, { PropsWithChildren, useContext, useEffect } from "react";
import { ethers, BrowserProvider, Signer } from "ethers";

export type Web3ContextType = {
  provider: BrowserProvider | null;
  signer: Signer | null;
  currentAccount: string;
};

export const Web3Context = React.createContext<Web3ContextType>({
  provider: null,
  signer: null,
  currentAccount: "",
});

export const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [provider, setProvider] = React.useState<BrowserProvider | null>(null);
  const [signer, setSigner] = React.useState<Signer | null>(null);
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  useEffect(() => {
    (async () => {
      const ethereum = (window as any).ethereum;
      // New metamask version
      if (typeof ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const browseProvider = new ethers.BrowserProvider(ethereum);
        ethereum.on("accountsChanged", function (accounts: string[]) {
          setCurrentAccount(accounts[0]);
        });
        const provSigner = await browseProvider.getSigner();
        setCurrentAccount(accounts[0]);
        setProvider(browseProvider);
        setSigner(provSigner);
      }
    })();
    return () => {
      provider?.off("accountsChanged");
    };
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, currentAccount }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
