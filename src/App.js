import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Routes, Route, Link, useRouteMatch, useParams } from 'react-router-dom'
import Home from './Pages/Home';
import Games from './Pages/Games';
import About from './Pages/About';
import Game from './Pages/Game';
import './app.css'

function App() {
  const [games, setGames] = useState([])
  
  useEffect(() => {
    fetch("https://bronze-harp-seal-veil.cyclic.app/")
      .then(res => res.json())
      .then(games => {
        setGames(games)
      })
      .catch(err => console.error(err))
  }, [])
  
  return (
    <div>
      <nav>
        <Link to="/">e-mathitis</Link>
        <a className="toggle-button" id="toggle-button">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </a>
        <ul className="navbar-links" id="navbar-links">
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        {games.map((game, idx) => (
          <Route key={idx} path={game.link} element={<Game game={game} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
