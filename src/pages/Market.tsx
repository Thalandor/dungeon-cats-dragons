import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import List from "../components/market-list/List";
import { CHARACTERS } from "./NewGame";
import styles from "./Market.module.scss";

const Market = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  return (
    <div className={styles.container}>
      <div>
        Own
        <List list={CHARACTERS} />
      </div>
      <div>
        Buy
        <List list={CHARACTERS} />
      </div>
    </div>
  );
};

export default Market;
