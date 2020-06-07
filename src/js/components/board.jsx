import React from 'react';
import MiddleGround from './middle-ground.jsx';
import PlayerPosition from './player.jsx';
import Paused from './paused.jsx';
import Header from './header.jsx';

export default class Board extends React.Component {
  render() {
  var p=this.props.timer?1:0;
  if(!this.props.gameOver){
    return (
      <div className='board-wrapper'>
        <Header score={this.props.score} />
        <Paused paused={this.props.paused} />
        <MiddleGround shots={this.props.shots} badGuys={this.props.badGuys} />
        <PlayerPosition playerPosition={this.props.playerPosition} />
      </div>
    )
  }
  else{
  return (
      <div className='board-wrapper'>
        <MiddleGround shots={this.props.shots} badGuys={this.props.badGuys} score={this.props.score} 
        gameOver={this.props.gameOver}/>
      </div>
      )
  }
  }
}
