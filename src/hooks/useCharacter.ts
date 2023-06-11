import { useWeb3Context } from "../providers/Web3";
import { ContractABI, ContractAddress } from "../config/contract";
import { IStats } from "../components/character/Character";

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

  const getOwnedCharacters = async () => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      const characters: ICharacterSolidity[] = await nftContract.methods
        .getOwnedCharacters()
        .call({ from: accounts[0] });
      return characters;
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
      characters = characters.filter(
        (p) => !ownedPieces.some((ow) => ow.tokenId === p.tokenId)
      );
      return characters;
    }
    return [];
  };

  const buyCharacter = async (tokenId: number, price: bigint) => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const gasPrice = await web3.eth.getGasPrice();

      const gasEstimate = await nftContract.methods
        .buyCharacter(tokenId)
        .estimateGas({
          from: currentAccount,
          value: price.toString(),
        });
      await nftContract.methods.buyCharacter(tokenId).send({
        from: currentAccount,
        gasPrice: gasPrice.toString(),
        gas: gasEstimate.toString(),
        value: price.toString(),
      });
    }
  };

  const abandonCharacter = async (tokenId: number) => {
    if (web3) {
      const nftContract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const gasPrice = await web3.eth.getGasPrice();

      const gasEstimate = await nftContract.methods
        .abandonCharacter(tokenId)
        .estimateGas({
          from: currentAccount,
        });
      await nftContract.methods.abandonCharacter(tokenId).send({
        from: currentAccount,
        gasPrice: gasPrice.toString(),
        gas: gasEstimate.toString(),
      });
    }
  };

  return {
    getOwnedCharacters,
    getAllCharacters,
    buyCharacter,
    abandonCharacter,
  };
};
