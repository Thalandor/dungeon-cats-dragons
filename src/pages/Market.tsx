import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";

const Market = () => {
  const navigate = useNavigate();
  useKeyPress(() => navigate("/"), ["Escape"]);
  return <div>Market</div>;
};

export default Market;
