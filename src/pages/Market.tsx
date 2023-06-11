import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import List from "../components/market-list/List";
import { ICharacter } from "./NewGame";
import styles from "./Market.module.scss";
import { useCharacter } from "../hooks/useCharacter";
import { useEffect, useState } from "react";

const Market = () => {
  const [allCharacters, setAllCharacters] = useState<ICharacter[]>([]);
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacter[]>([]);
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  const { getAllCharacters, getOwnedCharacters } = useCharacter();
  useEffect(() => {
    (async () => {
      const characters = await getAllCharacters();
      const ownCharacters = await getOwnedCharacters();
      setAllCharacters(characters);
      setOwnedCharacters(ownCharacters);
    })();
  }, [getAllCharacters, getOwnedCharacters]);
  return (
    <div className={styles.container}>
      <div>
        Own
        <List list={ownedCharacters} />
      </div>
      <div>
        Buy
        <List list={allCharacters} />
      </div>
    </div>
  );
};

export default Market;
