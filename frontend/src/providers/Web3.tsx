import React, { PropsWithChildren, useContext, useEffect } from "react";
import { Web3 } from "web3";

export type Web3ContextType = {
  web3: Web3 | null;
};

export const Web3Context = React.createContext<Web3ContextType>({ web3: null });

export const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [web3, setWeb3] = React.useState<Web3 | null>(null);

  useEffect(() => {
    (async () => {
      const ethereum = (window as any).ethereum;
      // New metamask version
      if (typeof ethereum !== "undefined") {
        await ethereum.request({
          method: "eth_requestAccounts",
        });
        setWeb3(new Web3(ethereum));
      }
    })();
  }, []);

  return (
    <Web3Context.Provider value={{ web3 }}>{children}</Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
