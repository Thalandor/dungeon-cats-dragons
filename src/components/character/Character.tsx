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

interface ICharacter {
  name: string;
  avatar: string;
  body: string;
  stats: IStats;
}

const Character = () => {
  const characterSelected: ICharacter = {
    name: "barcatian",
    avatar: "",
    body: "",
    stats: {
      strength: 5,
      dexterity: 3.5,
      constitution: 4,
      intelligence: 2,
      wisdom: 1,
      charisma: 2,
    },
  };

  return (
    <div className={styles.parent}>
      <div>Character skin</div>
      <div>
        <Stats stats={characterSelected.stats} />
      </div>
    </div>
  );
};

export default Character;
