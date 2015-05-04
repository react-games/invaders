import {SHOT_SPEED, PLAYER_SPEED, SCREEN_WIDTH, SHOT_POSITION_QUANTIZATION} from './constants.js';

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
    this.stateCopy.shots = this.stateCopy.shots
      .filter(shot => shot.y < 700)
      .map(shot => {
        return {x: shot.x, y: shot.y + SHOT_SPEED, key: shot.key, type: 'SHOT'}
      });
    return this;
  }

  detectSmashing() {
    // Assume that no two objects of the same type will occupy the same
    // rectangle at the same time. Make a map where keys are `${item.x}-${item.y}`
    // for items in shots | badGuys and values are the items. If there are ever keys
    // with two items, remove both items.
    // Allow 'hits' to count from the edge of a badGuy to one SHOT_POSITION_QUANTIZATION
    // over
    let collisionMap = {};
    this.stateCopy.shots.forEach(shot => {
      let key = `${shot.x}-${shot.y}`;
      collisionMap[key] = shot;
    });
    this.stateCopy.badGuys.forEach(badGuy => {
      let key = `${badGuy.x}-${badGuy.y}`;
      let keyToTheRight = `${badGuy.x + SHOT_POSITION_QUANTIZATION}-${badGuy.y}`;
      if (collisionMap[key]) {
        ++this.stateCopy.score;
        delete collisionMap[key];
        return;
      } else if (collisionMap[keyToTheRight]) {
        ++this.stateCopy.score;
        delete collisionMap[keyToTheRight];
        return;
      }
      collisionMap[key] = badGuy;
    });
    this.stateCopy.shots = [];
    this.stateCopy.badGuys = [];
    Object.keys(collisionMap).forEach(item => {
      let value = collisionMap[item];
      if (value.type === 'SHOT') {
        this.stateCopy.shots.push(value);
      } else {
        this.stateCopy.badGuys.push(value);
      }
    });
    return this;
  }

  moveBadGuys() {
    return this;
  }

  makeNewBadGuys() {
    return this;
  }

  syncStateToGame() {
    this.game.setState(() => {
      return this.stateCopy;
    });

    return this;
  }
}


