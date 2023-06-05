import Character from "../components/character/Character";
import styles from "./NewGame.module.scss";
const NewGame = () => {
  return (
    <div className={styles.parent}>
      <div style={{ flex: 80 }}>
        <Character />
      </div>
      <div style={{ flex: 20 }}>Character list</div>
    </div>
  );
};

export default NewGame;
