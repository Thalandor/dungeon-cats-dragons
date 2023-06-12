import { useWeb3Context } from "../providers/Web3";
import { ContractABI, ContractAddress } from "../config/contract";
import { IStats } from "../components/character/Character";
import { Contract } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";

export interface ICharacterSolidity {
  name: string;
  portrait: string;
  skin: string;
  stats: IStats;
  price: bigint;
  tokenId: number;
}

export const useCharacter = () => {
  const { provider, signer, currentAccount } = useWeb3Context();

  const getOwnedCharacters = useCallback(async () => {
    if (provider) {
      const nftContract = new Contract(ContractAddress, ContractABI, provider);
      const characters: ICharacterSolidity[] =
        await nftContract.getOwnedCharacters({ from: currentAccount });
      return characters;
    }
    return [];
  }, [currentAccount, provider]);

  const getAllCharacters = useCallback(async () => {
    if (provider) {
      const nftContract = new Contract(ContractAddress, ContractABI, provider);
      let characters: ICharacterSolidity[] = await nftContract.getAllCharacters(
        { from: currentAccount }
      );
      const ownedPieces = await getOwnedCharacters();
      characters = characters.filter(
        (p) => !ownedPieces.some((ow) => ow.tokenId === p.tokenId)
      );
      return characters;
    }
    return [];
  }, [currentAccount, getOwnedCharacters, provider]);

  const buyCharacter = useCallback(
    async (tokenId: number, price: bigint) => {
      const nftContract = new Contract(ContractAddress, ContractABI, signer);
      await nftContract.buyCharacter(tokenId, {
        from: currentAccount,
        value: price.toString(),
      });
    },
    [currentAccount, signer]
  );

  const abandonCharacter = useCallback(
    async (tokenId: number) => {
      const nftContract = new Contract(ContractAddress, ContractABI, signer);
      await nftContract.abandonCharacter(tokenId, {
        from: currentAccount,
      });
    },
    [currentAccount, signer]
  );

  const buyEvent = useCallback(async () => {
    const nftContract = new Contract(ContractAddress, ContractABI, signer);
    nftContract.on("CharacterBought", (buyer, name, event) => {
      toast.success(`${buyer} has bought the character '${name}'`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      event.removeListener();
    });
  }, [signer]);

  const abandonEvent = useCallback(async () => {
    const nftContract = new Contract(ContractAddress, ContractABI, signer);
    nftContract.on("CharacterAbandoned", (name, event) => {
      toast.success(`${name} has been abandoned :(`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      event.removeListener();
    });
  }, [signer]);

  return {
    getOwnedCharacters,
    getAllCharacters,
    buyCharacter,
    abandonCharacter,
    buyEvent,
    abandonEvent,
  };
};
