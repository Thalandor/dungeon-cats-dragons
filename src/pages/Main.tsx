import { useNavigate } from "react-router-dom";
import styles from "./Main.module.scss";
import yousad from "../assets/yousad.png";
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.parent}>
      <div className={styles.title}>
        <img className={styles.rotate} src={yousad}></img>
        <div className={styles.and}>&</div>
        <div className={styles.elements}>
          <div>Dungeons</div>
          <div>Cats</div>
          <div>Dragons</div>
        </div>
        <img src={yousad}></img>
      </div>
      <div className={styles.options}>
        <div onClick={() => navigate("/new")}>New game</div>
        <div onClick={() => navigate("/market")}>Market</div>
      </div>
    </div>
  );
};

export default Main;
