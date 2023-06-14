import { useNavigate } from "react-router-dom";
import Character from "../components/character/Character";
import { useKeyPress } from "../hooks/useKeyPress";
import styles from "./NewGame.module.scss";
import CharacterList from "../components/character-list/CharacterList";
import { useEffect, useState } from "react";
import { ICharacterSolidity, useCharacter } from "../hooks/useCharacter";

const defaultCharacter: ICharacterSolidity = {
  name: "Choose your hero!",
  portrait: "./interrogation_skin.jpg",
  skin: "./interrogation_skin.jpg",
  stats: {
    strength: BigInt(0),
    dexterity: BigInt(0),
    constitution: BigInt(0),
    intelligence: BigInt(0),
    wisdom: BigInt(0),
    charisma: BigInt(0),
  },
  tokenId: 99,
  price: BigInt(0),
};

const NewGame = () => {
  const [ownedCharacters, setOwnedCharacters] = useState<ICharacterSolidity[]>(
    []
  );
  const { getOwnedCharacters } = useCharacter();
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacterSolidity>(defaultCharacter);

  useEffect(() => {
    (async () => {
      const ownCharacters = await getOwnedCharacters();
      setOwnedCharacters(ownCharacters);
    })();
  }, [getOwnedCharacters]);

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
