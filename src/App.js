import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import Routes from './Routes';

function App() {
  return (
    <div>
      <div className="nav-bar">
        <NavLink className="link" activeClassName="active" to="/login">
        <b>LOGIN</b>
        </NavLink>
        <NavLink className="link" activeClassName="active" exact to="/">
        <b>HOME</b>
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/favs">
        <b>FAVS</b>
        </NavLink>
      </div>
      <Routes />
    </div>
  );
}

export default App;
