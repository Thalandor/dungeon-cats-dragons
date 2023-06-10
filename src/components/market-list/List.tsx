import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICharacter } from "../../pages/NewGame";
import styles from "./List.module.scss";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  list: ICharacter[];
}
const List: React.FC<Props> = ({ list }) => {
  return (
    <div className={styles.container}>
      {list.map((character) => (
        <div key={character.name} className={styles.row}>
          <div className={styles.img}>
            <img src={character.portrait}></img>
          </div>
          <div className={styles.name}>{character.name}</div>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faDollar} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
