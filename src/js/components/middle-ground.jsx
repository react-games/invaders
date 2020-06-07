import React from 'react';

export default class MiddleGround extends React.Component {
  renderShots() {
    return this.props.shots.map(shot => {
      return (
        <div className='shot' style={{left: shot.x, bottom: shot.y}} key={`shot-${shot.key}`} />
      );
    });
  }

  renderBadGuys() {
    return this.props.badGuys.map(badGuy => {
     if(badGuy.badGuyType){
      return (
        <div className='bad-guy-one' style={{left: badGuy.x, bottom: badGuy.y}} key={`bad-guy-${badGuy.key}`} />
      )
      }
      else {
      return (
        <div className='bad-guy-two' style={{left: badGuy.x, bottom: badGuy.y}} key={`bad-guy-${badGuy.key}`} />
      )
      }
    });   
  }

  render() {
  if(!this.props.gameOver){
    return (
      <div className='middle-ground'>
        { this.renderShots() }
        { this.renderBadGuys() }
      </div>
    )
    }
    else{
    return (
   
    <div className='game-over'>
    <h1> GAME OVER </h1>
    <h2> YOUR SCORE IS - {this.props.score} </h2>
    </div>
    )
    }
  }
}
