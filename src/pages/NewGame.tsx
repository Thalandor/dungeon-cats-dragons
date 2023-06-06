import { useNavigate } from "react-router-dom";
import Character from "../components/character/Character";
import { useKeyPress } from "../hooks/useKeyPress";
import styles from "./NewGame.module.scss";

const NewGame = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
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
