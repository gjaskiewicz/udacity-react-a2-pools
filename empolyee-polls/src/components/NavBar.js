import { Link } from "react-router-dom";

import "./css/NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/questions">Home</Link>
        </li>
        <li>
          <Link to="/add">Create New</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;