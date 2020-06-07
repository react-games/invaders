import {
  SHOT_SPEED,
  PLAYER_SPEED,
  SCREEN_WIDTH,
  SHOT_POSITION_QUANTIZATION,
  BAD_GUY_DELAY,
  BAD_GUY_PLACEHOLDERS
} from './constants.js';

let badGuyMoveTicker = 0;
let makeNewBadGuyRowTicker = 0;
let badGuyKey = 1;
let badGuyWave = 1;
let movingRight = true;
let badGuyTypeNo= 1;
function updateMovingState() {
  if (movingRight) {
    if (++badGuyWave === 6) {
      movingRight = false;
    }
  } else {
    if (--badGuyWave === 0) {
      movingRight = true;
    }
  }
}

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
      .decrementTimer()
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
      .filter(shot => shot.y < 469)
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
    // over, one SHOT_SPEED up, and over one SHOT_POSITION_QUANTIZATION up one SHOT_SPEED
    let collisionMap = {};
    this.stateCopy.shots.forEach(shot => {
      let key = `${shot.x}-${shot.y}`;
      collisionMap[key] = shot;
    });
    this.stateCopy.badGuys.forEach(badGuy => {
      let key = `${badGuy.x}-${badGuy.y}`;
      let keyToTheRight = `${badGuy.x + SHOT_POSITION_QUANTIZATION}-${badGuy.y}`;
      let keyToTheUp = `${badGuy.x}-${badGuy.y + SHOT_SPEED}`;
      let keyToTheUpRight = `${badGuy.x + SHOT_POSITION_QUANTIZATION}-${badGuy.y + SHOT_SPEED}`;
      if (collisionMap[key] || collisionMap[keyToTheRight] || collisionMap[keyToTheUp] || collisionMap[keyToTheUpRight]) {
        ++this.stateCopy.score;
      if(this.stateCopy.highestScore < this.stateCopy.score){
      	 this.stateCopy.highestScore=this.stateCopy.score;
      	 }
        delete collisionMap[key];
        delete collisionMap[keyToTheRight];
        delete collisionMap[keyToTheUp];
        delete collisionMap[keyToTheUpRight];
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
    if ((++badGuyMoveTicker)%(BAD_GUY_DELAY) === 0) {
      this.stateCopy.badGuys = this.stateCopy.badGuys
        .filter(badGuy => badGuy.y > 0)
        .map(badGuy => {
          let offSet=0;
          if(badGuy.currentBadGuyWave >3){
          	offSet=-20;
          	if(++badGuy.currentBadGuyWave >6){
          		badGuy.currentBadGuyWave=1;
          	}
          }
          else{
          	offSet=20;
          	badGuy.currentBadGuyWave+=1;
          }
          
          return {x: badGuy.x+offSet, y: badGuy.y - 10, key: badGuy.key, type: 'BAD_GUY',currentBadGuyWave: badGuy.currentBadGuyWave , badGuyType: badGuy.badGuyType}
        });
    }
    return this;
  }

  makeNewBadGuys() {
    if ((++makeNewBadGuyRowTicker)%(BAD_GUY_DELAY * 6) === 0) {
      updateMovingState();
      badGuyTypeNo=!badGuyTypeNo;
      let newBadGuyRow = BAD_GUY_PLACEHOLDERS
        .map(offset => {
          badGuyTypeNo=!badGuyTypeNo;
          return {
            x: 75* offset + badGuyWave * 20,
            y: 440,
            key: `bad-guy-${++badGuyKey}`,
            type: 'BAD_GUY',
            currentBadGuyWave: badGuyWave,
            badGuyType: badGuyTypeNo
          }
        });
       
      this.stateCopy.badGuys = this.stateCopy.badGuys.concat(newBadGuyRow);
       badGuyTypeNo=!badGuyTypeNo;
     
    }
    return this;
  }
 decrementTimer(){
   if(this.stateCopy.minutes===0 && this.stateCopy.seconds===0){
   	this.stateCopy.gameOver = true;
   	}
   else {
      if(this.stateCopy.seconds >0){
      	this.stateCopy.seconds=this.stateCopy.seconds-1
      }
      else{
        this.stateCopy.minutes=this.stateCopy.minutes-1 
        this.stateCopy.seconds=59
      }
   }
   return this;	 
 }
  syncStateToGame() {
    this.game.setState(() => {
      return this.stateCopy;
    });
    return this;
  }
}


