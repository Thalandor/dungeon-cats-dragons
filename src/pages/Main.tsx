import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New Game</Link>
          </li>
          <li>
            <Link to="/market">Market</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Main;
