import React from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/servers">Servers</Link>
          </li>
          <li>
            <Link to="/alertmessage">Alerts</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

