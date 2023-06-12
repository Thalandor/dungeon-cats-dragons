import { useWeb3Context } from "../providers/Web3";
import { ContractABI, ContractAddress } from "../config/contract";
import { IStats } from "../components/character/Character";
import { useCallback } from "react";

export interface ICharacterSolidity {
  name: string;
  portrait: string;
  skin: string;
  stats: IStats;
  price: bigint;
  tokenId: number;
}

export const useCharacter = () => {
  const { web3 } = useWeb3Context();

  const getOwnedCharacters = useCallback(async () => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      const characters: ICharacterSolidity[] = await nftContract.methods
        .getOwnedCharacters()
        .call({ from: accounts[0] });
      return characters;
    }
    return [];
  }, [web3]);

  const getAllCharacters = useCallback(async () => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      let characters: ICharacterSolidity[] = await nftContract.methods
        .getAllCharacters()
        .call();
      const ownedPieces = await getOwnedCharacters();
      characters = characters.filter(
        (p) => !ownedPieces.some((ow) => ow.tokenId === p.tokenId)
      );
      return characters;
    }
    return [];
  }, [getOwnedCharacters, web3]);

  const buyCharacter = useCallback(
    async (tokenId: number, price: bigint) => {
      if (web3) {
        const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        await nftContract.methods.buyCharacter(tokenId).send({
          from: currentAccount,
          value: price.toString(),
        });
      }
    },
    [web3]
  );

  const abandonCharacter = useCallback(
    async (tokenId: number) => {
      if (web3) {
        const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        await nftContract.methods.abandonCharacter(tokenId).send({
          from: currentAccount,
        });
      }
    },
    [web3]
  );

  return {
    getOwnedCharacters,
    getAllCharacters,
    buyCharacter,
    abandonCharacter,
  };
};
