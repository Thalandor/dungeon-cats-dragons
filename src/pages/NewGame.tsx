import { useNavigate } from "react-router-dom";
import Character, { IStats } from "../components/character/Character";
import { useKeyPress } from "../hooks/useKeyPress";
import styles from "./NewGame.module.scss";
import CharacterList from "../components/character-list/CharacterList";
import { useEffect, useState } from "react";
import { useCharacter } from "../hooks/useCharacter";

export interface ICharacter {
  name: string;
  portrait: string;
  skin: string;
  stats: IStats;
  tokenId: number;
}

const defaultCharacter = {
  name: "Choose your hero!",
  portrait: "./interrogation_skin.jpg",
  skin: "./interrogation_skin.jpg",
  stats: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  tokenId: 99,
};

const NewGame = () => {
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacter[]>([]);
  const { getAllCharacters } = useCharacter();
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacter>(defaultCharacter);

  useEffect(() => {
    (async () => {
      const ownCharacters = await getAllCharacters();
      setOwnedCharacters(ownCharacters);
    })();
  }, [getAllCharacters]);

  return (
    <div className={styles.container}>
      <div style={{ flex: 80 }}>
        <Character selectedCharacter={selectedCharacter} />
      </div>
      <div className={styles.characterList}>
        <CharacterList
          setSelectedCharacter={setSelectedCharacter}
          characters={ownedCharacters}
        />
      </div>
    </div>
  );
};

export default NewGame;
