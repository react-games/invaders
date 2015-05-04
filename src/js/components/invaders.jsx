import React from 'react';
import Board from './board.jsx';
import {keyDownHandler, keyUpHandler} from '../lib/util.js';
import GameProcessor from '../lib/game-processor.js';
import {LEFT, RIGHT, FIRE, LOOP_INTERVAL_MILLIS, SCREEN_WIDTH} from '../lib/constants.js';

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
      badGuys: [{x: 20, y: 400, key: INITIAL_BAD_GUY_KEY, type: 'BAD_GUY'}, {x: 80, y: 200, key: INITIAL_BAD_GUY_KEY+1, type: 'BAD_GUY'}]
    };

    this.processor = new GameProcessor(this);
    this.loopIntervalMillis = LOOP_INTERVAL_MILLIS;
    document.body.onkeydown = keyDownHandler.bind(this);
    document.body.onkeyup = keyUpHandler.bind(this);
    this.gameLoop = setInterval(() => this.processor.processTick(), this.loopIntervalMillis);
  }

  render() {
    return (
      <div className='page'>
        <Board {...this.state}/>
      </div>
    )
  }
}
