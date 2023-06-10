import React from "react";
import styles from "./CharacterList.module.scss";
import { ICharacter } from "../../pages/NewGame";

interface CharacterListProps {
  characters: ICharacter[];
  setSelectedCharacter: React.Dispatch<React.SetStateAction<ICharacter>>;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  setSelectedCharacter,
}) => {
  return (
    <div className={styles.container}>
      {characters.map((character) => (
        <div onClick={() => setSelectedCharacter(character)}>
          <div key={character.name} className={styles.character}>
            <img
              src={character.portrait}
              alt={character.name}
              className={styles.image}
            />
          </div>
          <div className={styles.characterName}>{character.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
