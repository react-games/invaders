import React from 'react';
import Board from './board';

const LEFT = 90; //z
const RIGHT = 88; //x
const FIRE = 32; //space

function move(leftOrRight, prev) {
  const oldPosition = prev.playerPosition;
  let newPosition;
  if (leftOrRight === LEFT) {
    newPosition = oldPosition > 0 ? oldPosition - 0.5 : 0;
  } else {
    newPosition = oldPosition < 95 ? oldPosition + 0.5 : 95;
  }
  return {
    playerPosition: newPosition
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
          this.setState(move.bind(null, LEFT));
          break;
        case RIGHT:
          this.setState(move.bind(null, RIGHT));
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
