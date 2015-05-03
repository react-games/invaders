import React from 'react';
import Board from './board.jsx';
import {
  moveShip,
  moveShots,
  moveBadGuys,
  makeNewBadGuys,
  detectSmashing,
  keyDownHandler,
  keyUpHandler
  } from '../lib/util.js';
import {LEFT, RIGHT, FIRE, LOOP_INTERVAL_MILLIS} from '../lib/constants.js';

function tick(game) {
  moveShip(game);
  moveShots(game);
  detectSmashing(game);
  moveBadGuys(game);
  makeNewBadGuys(game);
}

export default class Invaders extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      playerPosition: 45,
      left: false,
      right: false,
      shots: [],
      badGuys: []
    };

    this.loopIntervalMillis = LOOP_INTERVAL_MILLIS;
    document.body.onkeydown = keyDownHandler.bind(this);
    document.body.onkeyup = keyUpHandler.bind(this);
    this.gameLoop = setInterval(() => tick(this), this.loopIntervalMillis);
  }

  render() {
    return (
      <div className='page'>
        <Board {...this.state}/>
      </div>
    )
  }
}
