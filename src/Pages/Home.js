import React, { createElement, useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  const [games, setGames] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
        const fetchData = async () =>{
            const res = await fetch('https://bronze-harp-seal-veil.cyclic.app/latest/')
            const json = await res.json()
            setGames(json)
            return json
        }

        function add_listeners(items, root) {
            for(let i=0; i<items.length; i++) {
                items[i].addEventListener('click', () => {
                    setActiveItem(items, i)
                    root.style.setProperty('--selected-item', i)
                    change_game_link(i)
                })
            }
        }

        function setActiveItem(items, i) {
            items[i].classList.toggle('active-game-item')
            for (let j=0; j<items.length; j++) {
                if (j === i) continue
                items[j].classList.remove('active-game-item')
            }
        }

        function change_game_link(idx) {
            const buttons = document.getElementsByClassName('play-button')
            const i = parseInt(idx)
            buttons[i].style.display = 'flex'
            for (let j=0; j<buttons.length; j++) {
                if (j === i) continue
                buttons[j].style.display = 'none'
            }
        }

        fetchData().then((games) => {
            const items_container = document.getElementById('items-container')
            const img_container = document.getElementById('img-container')
            games.forEach((game, idx) => {
                const a = document.createElement('a')
                a.id = `${idx+1}`
                const li = document.createElement('li')
                li.style = `--i:${6-idx}`
                li.className = 'game-item'
                li.innerText = game.name
                a.appendChild(li)
                items_container.appendChild(a)
                const div = document.createElement('div')
                div.className = 'play-button'
                const link = document.createElement('a')
                link.href = game.link
                const text_div = document.createElement('div')
                text_div.innerText = 'Play'
                link.appendChild(text_div)
                div.appendChild(link)
                img_container.appendChild(div)
            })
            let root = document.querySelector(':root')
            const items = document.getElementsByClassName('game-item');
            root.style.setProperty('--selected-item', 0)
            setActiveItem(items, parseInt(root.style.getPropertyValue('--selected-item')))
            change_game_link(root.style.getPropertyValue('--selected-item'))       
            add_listeners(items, root)
        })
  }, [])
  
  return (
    <div className='center'>
      <h1 className='title'>Home</h1>
      <hr />
      <h2 className='sub-title'>NEW GAMES</h2>
      <div className="new-games-container">
          <ul id='items-container'>
              
          </ul>
          <div className="img-container" id='img-container'>
                <div className='images'>
                    {games.map((game, idx) => (
                        <img key={idx} src={game.image} className='game-img' />
                    ))}
                </div>
              <div className='img-bg'></div>
          </div>
      </div>
    </div>
  )
}
