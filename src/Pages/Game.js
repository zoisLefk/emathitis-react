import React, { useEffect, useState } from 'react'

export default function Game(props) {
  const clickHandler = () => {
    const fullscreen_button = document.getElementById('fullscreen-button');
    document.getElementById('game-wrapper').classList.toggle('fullscreen')
    fullscreen_button.classList.toggle('is-fullscreen')
  }
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://bronze-harp-seal-veil.cyclic.app/games/fish/fishv0.js'
    document.body.appendChild(script)

    const game_script = document.createElement('script')
    game_script.src = props.game.script
    document.body.appendChild(game_script)

    const game_style = document.createElement('link')
    game_style.rel = 'stylesheet'
    game_style.href = props.game.style
    document.body.appendChild(game_style)

    const fullscreen_button = document.getElementById('fullscreen-button');
    if (fullscreen_button) {
        fullscreen_button.addEventListener('click', clickHandler)
        fullscreen_button.onmousedown = (event) => event.preventDefault()
    }

    return () => {
      script.parentNode.removeChild(script)
      game_script.parentNode.removeChild(game_script)
      game_style.parentNode.removeChild(game_style)
      fullscreen_button.removeEventListener('click', clickHandler)
    }
  }, [])
  
  return (
    <div className='wrapper' id='game-wrapper'>
      <div className='game-header'>
        <h1 className='title'>{props.game.name}</h1>
        <button className='fullscreen-button' id='fullscreen-button'>
            <div className='row'>
                <span></span>
                <span></span>
            </div>
            <div className='row'>
                <span></span>
                <span></span>
            </div>
        </button>
      </div>
      <div className='game' id='game'></div>
    </div>
  )
}
