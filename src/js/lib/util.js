import {LEFT, RIGHT, FIRE, SHOT_SPEED, PLAYER_SPEED} from './constants.js';

let shotKey = 1;
let badGuyKey = 1;

export function moveShip(game) {
  const {playerPosition, left, right} = game.state;
  let newPosition = null;
  if (left && !right) {
    newPosition = playerPosition > 0 ? playerPosition - PLAYER_SPEED : 0;
  } else if (right && !left) {
    newPosition = playerPosition < 94.5 ? playerPosition + PLAYER_SPEED : 94.5;
  }
  if (newPosition !== null) {
    game.setState({playerPosition: newPosition});
  }
}

export function moveShots(game) {
  const shots = game.state.shots;
  let newShots = shots
    .filter(shot => shot.y < 700)
    .map(shot => {return {x: shot.x, y: shot.y + SHOT_SPEED, key: shot.key}});
  game.setState({shots: newShots});
}

export function moveBadGuys(game) { }
export function makeNewBadGuys(game) { }
export function detectSmashing(game) { }

export function keyDownHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: true});
    case RIGHT:
      return this.setState({right: true});
    case FIRE:
      return this.setState({shots: this.state.shots.concat([{x: this.state.playerPosition + 2.25, y: 0, key: ++shotKey}])});
  }
}

export function keyUpHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: false});
    case RIGHT:
      return this.setState({right: false});
  }
}
