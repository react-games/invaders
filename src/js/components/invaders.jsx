import React from 'react';
import Board from './board.jsx';
import {keyDownHandler, keyUpHandler} from '../lib/util.js';
import GameProcessor from '../lib/game-processor.js';
import {LEFT, RIGHT, FIRE, SCREEN_WIDTH, LOOP_INTERVAL_MILLIS} from '../lib/constants.js';

const INITIAL_BAD_GUY_KEY = -5;

export default class Invaders extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      playerPosition: SCREEN_WIDTH/2,
      left: false,
      right: false,
      shots: [],
      badGuys: [{x: 40, y: 400, key: INITIAL_BAD_GUY_KEY, type: 'BAD_GUY'}, {x: 100, y: 200, key: INITIAL_BAD_GUY_KEY+1, type: 'BAD_GUY'}],
      paused: false
    };

    this.playPause = function() {
      if (this.gameLoop) {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        this.setState({paused: true});
      } else {
        this.gameLoop = setInterval(() => this.processor.processTick(), LOOP_INTERVAL_MILLIS);
        this.setState({paused: false});
      }
    };

    this.processor = new GameProcessor(this);
    document.body.onkeydown = keyDownHandler.bind(this);
    document.body.onkeyup = keyUpHandler.bind(this);
    this.playPause();
  }


  render() {
    return (
      <div className='page'>
        <Board {...this.state}/>
      </div>
    )
  }
}
