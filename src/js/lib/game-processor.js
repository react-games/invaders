import {SHOT_SPEED, PLAYER_SPEED, SCREEN_WIDTH} from './constants.js';

export default class GameProcessor {
  constructor(game) {
    this.game = game;
    this.stateCopy = null;
  }

  processTick() {
    this.copyGameState()
      .moveShip()
      .moveShots()
      .detectSmashing()
      .moveBadGuys()
      .makeNewBadGuys()
      .syncStateToGame();
  }

  copyGameState() {
    this.stateCopy = JSON.parse(JSON.stringify(this.game.state));
    return this;
  }

  moveShip() {
    const {playerPosition, left, right} = this.stateCopy;
    let newPosition = null;
    if (left && !right) {
      newPosition = playerPosition > 0 ? playerPosition - PLAYER_SPEED : 0;
    } else if (right && !left) {
      newPosition = playerPosition < SCREEN_WIDTH ? playerPosition + PLAYER_SPEED : SCREEN_WIDTH;
    }
    if (newPosition !== null) {
      this.stateCopy.playerPosition = newPosition;
    }
    return this;
  }

  moveShots() {
    Object.keys(this.stateCopy.shots).forEach(offset => {
      this.stateCopy.shots[offset] = this.stateCopy.shots[offset]
        .filter(shot => shot.y < 700)
        .map(shot => {
          return {y: shot.y + SHOT_SPEED, key: shot.key}
        });
    });
    return this;
  }

  detectSmashing() {
    // TODO: think of a good way
    // maybe keep a map of badGuys something like:
    // badGuys: {
    //   offset1: {
    //     [badGuy.y - SHOT_HEIGHT]: badGuy
    //   }
    // }
    // or something?
    const {shots, badGuys} = this.stateCopy;
    let newShots = {};
    let newBadGuys = {};
    return this;
  }

  moveBadGuys() {
    return this;
  }

  makeNewBadGuys() {
    return this;
  }

  syncStateToGame() {
    this.game.setState(this.stateCopy);
    return this;
  }
}


