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

const NewGame = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);

  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>({
    name: "Choose your hero!",
    portrait: "../../assets/interrogation_skin.jpg",
    skin: "../../assets/interrogation_skin.jpg",
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
    <div className={styles.parent}>
      <div style={{ flex: 80 }}>
        <Character selectedCharacter={selectedCharacter} />
      </div>
      <div className={styles.characterList}>
        <CharacterList
          setSelectedCharacter={setSelectedCharacter}
          characters={[
            {
              name: "test",
              portrait: new URL("../assets/bard_portrait.jpg", import.meta.url)
                .href,
              skin: "../../assets/bard_skin.gif",
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
              name: "test2",
              portrait: new URL(
                "../assets/wizard_portrait.png",
                import.meta.url
              ).href,
              skin: "../../assets/wizard_skin.png",
              stats: {
                strength: 2,
                dexterity: 2,
                constitution: 2,
                intelligence: 5,
                wisdom: 3,
                charisma: 2,
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default NewGame;
