import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Games() {
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
      <h1 className='title'>Games</h1>
      <ul className='game-grid'>
        {games.map((game, idx) => (
          <li key={idx} className="card-container">
            <Link to={game.link}>
              <div className='card'>
                <img src={game.image} className='card-img' />
                <span>{ game.name }</span>
              </div>
            </Link>
          </li>
          )
        )}
      </ul>
    </div>
  )
}
