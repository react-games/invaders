import React from 'react';
import Board from './board.jsx';
import Timer from './timer.jsx';
import {keyDownHandler, keyUpHandler, restartGame} from '../lib/util.js';
import GameProcessor from '../lib/game-processor.js';
import {LEFT, RIGHT, FIRE, SCREEN_WIDTH, LOOP_INTERVAL_MILLIS} from '../lib/constants.js';

const INITIAL_BAD_GUY_KEY = -5;

export default class Invaders extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      highestScore:0,
      playerPosition: SCREEN_WIDTH/2,
      left: false,
      right: false,
      shots: [],
      badGuys: [{x: 40, y: 400, key: INITIAL_BAD_GUY_KEY, type: 'BAD_GUY'}, {x: 100, y: 50, key: INITIAL_BAD_GUY_KEY+1, type: 'BAD_GUY'}],
      paused: false,
      gameOver: false,
      countDown: true,
      minutes: 20,
      seconds: 0,
    };
    this.playPause = function() {
      if (this.gameLoop) {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        this.setState({paused: true});
        this.setState({timer: false});
        
      } else {
        this.gameLoop = setInterval(() => this.processor.processTick(), LOOP_INTERVAL_MILLIS);
        this.setState({paused: false});
        this.setState({timer: true});
      }
    };
    this.flipTimer = function() {
    	this.setState({countDown: !this.state.countDown});
    };
    this.processor = new GameProcessor(this);
    document.body.onkeydown = keyDownHandler.bind(this);
    document.body.onkeyup = keyUpHandler.bind(this);
    this.playPause();
    this.stopGame=this.stopGame.bind(this);
  };
  
  stopCounter() {
  	this.setState(prevState => ({
  	countDown: !prevState.countDown
	}));
    }
    
  stopGame() {
  	this.setState(prevState => ({
  	gameOver: !prevState.gameOver
	}));
	
	console.log(this.state.gameOver);
  }	
  	
  render() {
  
  if(!this.state.gameOver){
    return (
      <div className='page'>
        <Board {...this.state}/>
        <Timer  minutes={this.state.minutes} seconds={this.state.seconds} countDown={this.state.countDown}   gameOver={this.state.gameOver} changeHandler={this.stopGame}/>
      </div>
    )
    }
   
    else {
    return (
      <div className='gameOverpage'>
        <Board {...this.state}/>
        <button type="button" onClick={ restartGame.bind(this) }>
  	 New Game
	</button>
	<h2>HIGHEST SCORE - {this.state.highestScore} </h2>
      </div>
    )
    
    }
	}
}
