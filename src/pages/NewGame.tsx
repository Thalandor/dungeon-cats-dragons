import { useNavigate } from "react-router-dom";
import Character, { IStats } from "../components/character/Character";
import { useKeyPress } from "../hooks/useKeyPress";
import styles from "./NewGame.module.scss";
import CharacterList from "../components/character-list/CharacterList";
import { useState } from "react";

export interface ICharacter {
  name: string;
  portrait: string;
  skin: string;
  stats: IStats;
}

export const CHARACTERS: ICharacter[] = [
  {
    name: "Bard",
    portrait: "./bard_portrait.jpg",
    skin: "./bard_skin.gif",
    stats: {
      strength: 5,
      dexterity: 3.5,
      constitution: 4,
      intelligence: 2,
      wisdom: 1,
      charisma: 2,
    },
  },
  {
    name: "Wizard",
    portrait: "./wizard_portrait.png",
    skin: "./wizard_skin.png",
    stats: {
      strength: 2,
      dexterity: 2,
      constitution: 2,
      intelligence: 5,
      wisdom: 3,
      charisma: 2,
    },
  },
];

const NewGame = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);

  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>({
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
  });
  return (
    <div className={styles.container}>
      <div style={{ flex: 80 }}>
        <Character selectedCharacter={selectedCharacter} />
      </div>
      <div className={styles.characterList}>
        <CharacterList
          setSelectedCharacter={setSelectedCharacter}
          characters={CHARACTERS}
        />
      </div>
    </div>
  );
};

export default NewGame;
