import React from 'react';
import Board from './board.jsx';

const LEFT = 90; //z
const RIGHT = 88; //x
const FIRE = 32; //space

function tick(game) {
  moveShip(game);
  moveShots(game);
}

function moveShip(game) {
  const {playerPosition, left, right} = game.state;
  let newPosition = null;
  if (left && !right) {
    newPosition = playerPosition > 0 ? playerPosition - 5 : 0;
  } else if (right && !left) {
    newPosition = playerPosition < 94.5 ? playerPosition + 5 : 94.5;
  }
  if (newPosition !== null) {
    game.setState({playerPosition: newPosition});
  }
}

function moveShots(game) {
  const shots = game.state.shots;
  let newShots = shots
    .filter(shot => shot.yPosition <= 0)
    .map(shot => {return {x: shot.x, y: shot.y + 3}});
  game.setState({shots: newShots});
}

class Invaders extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      playerPosition: 45,
      left: false,
      right: false,
      shots: []
    };

    document.body.onkeydown = (e) => {
      switch (e.which) {
        case LEFT:
          return this.setState({left: true});
        case RIGHT:
          return this.setState({right: true});
        case FIRE:
          console.log('shooting!');
          return this.setState({shots: [{x: this.state.playerPosition, y: 0}, ...this.state.shots]});
      }
    };

    document.body.onkeyup = (e) => {
      switch (e.which) {
        case LEFT:
          return this.setState({left: false});
        case RIGHT:
          return this.setState({right: false});
      }
    };

    this.gameLoop = setInterval(() => tick(this), 50);
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
