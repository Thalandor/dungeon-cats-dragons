import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import List from "../components/market-list/List";

const Market = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  return (
    <div>
      <div>
        Owned
        <List />
      </div>
      <div>Buy</div>
    </div>
  );
};

export default Market;
