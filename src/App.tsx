import "./App.css";
import { Link, Route, Routes, Outlet } from "react-router-dom";
import Main from "./pages/Main";
import NewGame from "./pages/NewGame";
import Market from "./pages/Market";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="new" element={<NewGame />} />
        <Route path="market" element={<Market />} />

        {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
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

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;
