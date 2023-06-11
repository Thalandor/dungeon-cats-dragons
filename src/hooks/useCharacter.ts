import { useWeb3Context } from "../providers/Web3";
import { ContractABI, ContractAddress } from "../config/contract";
import { ICharacter } from "../pages/NewGame";

export interface ICharacterSolidity {
  name: string;
  portrait: string;
  skin: string;
  stats: {
    strength: bigint;
    dexterity: bigint;
    constitution: bigint;
    intelligence: bigint;
    wisdom: bigint;
    charisma: bigint;
  };
  price: bigint;
  tokenId: number;
}
const mapCharacterContract = (c: ICharacterSolidity): ICharacter => {
  return {
    name: c.name,
    portrait: c.portrait,
    skin: c.skin,
    stats: {
      strength: Number(c.stats.strength),
      dexterity: Number(c.stats.dexterity),
      constitution: Number(c.stats.constitution),
      intelligence: Number(c.stats.intelligence),
      wisdom: Number(c.stats.wisdom),
      charisma: Number(c.stats.charisma),
    },
    tokenId: c.tokenId,
  };
};

export const useCharacter = () => {
  const { web3 } = useWeb3Context();

  const getOwnedCharacters = async () => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      let characters: ICharacterSolidity[] = await nftContract.methods
        .getOwnedCharacters()
        .call({ from: accounts[0] });
      characters = characters.map((p) => {
        return { ...p, ethPrice: web3.utils.fromWei(p.price, "ether") };
      });
      const mappedCharacters = characters.map(mapCharacterContract);
      return mappedCharacters;
    }
    return [];
  };

  const getAllCharacters = async () => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      let characters: ICharacterSolidity[] = await nftContract.methods
        .getAllCharacters()
        .call();
      const ownedPieces = await getOwnedCharacters();
      characters = characters.map((c) => {
        return { ...c, ethPrice: web3.utils.fromWei(c.price, "ether") };
      });
      characters = characters.filter(
        (p) => !ownedPieces.some((ow) => ow.tokenId === p.tokenId)
      );
      const mappedCharacters: ICharacter[] =
        characters.map(mapCharacterContract);
      return mappedCharacters;
    }
    return [];
  };

  return { getOwnedCharacters, getAllCharacters };
};
