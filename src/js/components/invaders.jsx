import React from 'react';
import Board from './board';

const LEFT = 90; //z
const RIGHT = 88; //x
const FIRE = 32; //space

function moveLeft(previousState) {
  return {
    playerPosition: previousState.playerPosition > 0 ? previousState.playerPosition - 0.5 : 0
  }
}

function moveRight(previousState) {
  return {
    playerPosition: previousState.playerPosition < 95 ? previousState.playerPosition + 0.5 : 95
  }
}

class Invaders extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      playerPosition: 48
    };

    document.body.onkeydown = (e) => {
      switch (e.which) {
        case LEFT:
          this.setState(moveLeft);
          break;
        case RIGHT:
          this.setState(moveRight);
          break;
        case FIRE:
          break;
        default: return
      }
    }
  }

  render() {
    return (
      <div className='page'>
        <Board
          score={this.state.score}
          playerPosition={this.state.playerPosition}
          />
      </div>
    )
  }
}
 
export default Invaders;
