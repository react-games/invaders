import {LEFT, RIGHT, FIRE, PAUSE, PLAYER_RADIUS, SHOT_LIMIT, SHOT_POSITION_QUANTIZATION} from './constants.js';

let shotKey = 1;

export function keyDownHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: true});
    case RIGHT:
      return this.setState({right: true});
    case PAUSE:
      return this.playPause();
  }
}

export function keyUpHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: false});
    case RIGHT:
      return this.setState({right: false});
    case FIRE:
      return fireShot(this);
  }
}

export function fireShot(game) {
  if (game.state.shots.length >= SHOT_LIMIT) {
    return
  }

  const quantizedPosition = quantizeShotPosition(game.state.playerPosition);
  let newShot = {x: quantizedPosition, y: 0, key: ++shotKey, type: 'SHOT'};
  let newShots = game.state.shots.concat([newShot]);
  game.setState({shots: newShots});
}

function quantizeShotPosition(position) {
  let shotPosition = position + PLAYER_RADIUS;
  return SHOT_POSITION_QUANTIZATION * (Math.round(shotPosition/SHOT_POSITION_QUANTIZATION));
}
