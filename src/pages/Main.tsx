import { useNavigate } from "react-router-dom";
import styles from "./Main.module.scss";

const Main = () => {
  const navigate = useNavigate();
  const wizard = new URL("../assets/wizard_portrait.png", import.meta.url).href;
  return (
    <div className={styles.parent}>
      <div className={styles.title}>
        <img className={styles.rotate} src={wizard}></img>
        <div className={styles.letters}>
          <div className={styles.and}>&</div>
          <div className={styles.elements}>
            <div>Dungeons</div>
            <div>Cats</div>
            <div>Dragons</div>
          </div>
        </div>
        <img src={wizard}></img>
      </div>
      <div className={styles.options}>
        <div onClick={() => navigate("/new")}>New game</div>
        <div onClick={() => navigate("/market")}>Market</div>
      </div>
    </div>
  );
};

export default Main;
