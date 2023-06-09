import { ICharacter } from "../../pages/NewGame";
import Stats from "../stats/Stats";
import styles from "./Character.module.scss";

export interface IStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface Props {
  selectedCharacter: ICharacter;
}

const Character: React.FC<Props> = ({ selectedCharacter }) => {
  const skin = new URL(selectedCharacter.skin, import.meta.url).href;
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <div>{selectedCharacter.name}</div>
      </div>
      <div className={styles.characterInfo}>
        <div className={styles.skin}>
          <img src={skin} />
        </div>
        <div className={styles.stats}>
          <Stats stats={selectedCharacter.stats} />
        </div>
      </div>
    </div>
  );
};

export default Character;
