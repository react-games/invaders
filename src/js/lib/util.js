import {LEFT, RIGHT, FIRE, PLAYER_RADIUS, SHOT_LIMIT, SHOT_POSITION_QUANTIZATION} from './constants.js';

let shotKey = 1;
let badGuyKey = 1;

export function keyDownHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: true});
    case RIGHT:
      return this.setState({right: true});
    case FIRE:
      return fireShot(this);
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

export function fireShot(game) {
  if (game.state.activeShots < SHOT_LIMIT) {
    const quantizedPosition = quantizeShotPosition(game.state.playerPosition);
    let shots = game.state.shots;
    let shotsAtOffset = (shots[quantizedPosition] || []).concat([{y: 0, key: ++shotKey}]);
    shots[quantizedPosition] = shotsAtOffset;
    game.setState({shots: shots});
  }
}

function quantizeShotPosition(position) {
  let shotPosition = position + PLAYER_RADIUS;
  return SHOT_POSITION_QUANTIZATION * (Math.round(shotPosition/SHOT_POSITION_QUANTIZATION));
}
