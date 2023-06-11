import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import List from "../components/market-list/List";
import styles from "./Market.module.scss";
import { ICharacterSolidity, useCharacter } from "../hooks/useCharacter";
import { useEffect, useState } from "react";

const Market = () => {
  const [allCharacters, setAllCharacters] = useState<ICharacterSolidity[]>([]);
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacterSolidity[]>(
    []
  );
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  const { getAllCharacters, getOwnedCharacters, buyCharacter } = useCharacter();
  useEffect(() => {
    (async () => {
      const characters = await getAllCharacters();
      const ownCharacters = await getOwnedCharacters();
      setAllCharacters(characters);
      setOwnedCharacters(ownCharacters);
    })();
  }, [getAllCharacters, getOwnedCharacters]);

  const onBuyHandler = async (tokenId: number, price: bigint) => {
    await buyCharacter(tokenId, price);
  };
  return (
    <div className={styles.container}>
      <div>
        Own
        <List list={ownedCharacters} onClick={onBuyHandler} />
      </div>
      <div>
        Buy
        <List list={allCharacters} onClick={onBuyHandler} />
      </div>
    </div>
  );
};

export default Market;
