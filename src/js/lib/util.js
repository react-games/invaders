import {LEFT, RIGHT, FIRE, PAUSE, PLAYER_RADIUS, SHOT_LIMIT, SHOT_POSITION_QUANTIZATION,SCREEN_WIDTH,LOOP_INTERVAL_MILLIS,INITIAL_BAD_GUY_KEY } from './constants.js';
let shotKey = 1;

export function keyDownHandler(e) {
  switch (e.which) {
    case LEFT:
      return this.setState({left: true});
    case RIGHT:
      return this.setState({right: true});
    case PAUSE:
      this.playPause();
      this.stopCounter();
      return  this;
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

export function restartGame(e) {
      this.setState({score: 0});
      this.setState({playerPosition: SCREEN_WIDTH/2});
      this.setState({left: false});
      this.setState({right: false});
      this.setState({shots: []});
      this.setState({badGuys: [{x: 40, y: 400, key: INITIAL_BAD_GUY_KEY, type: 'BAD_GUY'}, {x: 100, y: 50, key: INITIAL_BAD_GUY_KEY+1, type: 'BAD_GUY'}]});
      this.setState({paused: false});
      this.setState({gameOver: false});
      this.setState({countDown: true});
      this.setState({minutes: 10});
      this.setState({seconds: 0});
      return this;
}

function quantizeShotPosition(position) {
  let shotPosition = position + PLAYER_RADIUS;
  return SHOT_POSITION_QUANTIZATION * (Math.round(shotPosition/SHOT_POSITION_QUANTIZATION));
}
