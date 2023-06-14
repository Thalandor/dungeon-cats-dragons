import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NewGame from "./pages/NewGame";
import Market from "./pages/Market";
import { useWeb3Context } from "./providers/Web3";

function App() {
  const { web3 } = useWeb3Context();

  return web3 ? (
    <Routes>
      <Route path="/" index element={<Main />} />
      <Route path="new" element={<NewGame />} />
      <Route path="market" element={<Market />} />
      <Route path="*" element={<Main />} />
    </Routes>
  ) : (
    <h1>Loading cats...</h1>
  );
}

export default App;
