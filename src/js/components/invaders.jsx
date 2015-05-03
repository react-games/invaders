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
    .filter(shot => shot.y < 700)
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
          return this.setState({shots: this.state.shots.concat([{x: this.state.playerPosition + 2, y: 0}])});
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

    this.gameLoop = setInterval(() => tick(this), 20);
  }

  render() {
    return (
      <div className='page'>
        <Board {...this.state}/>
      </div>
    )
  }
}
 
export default Invaders;
