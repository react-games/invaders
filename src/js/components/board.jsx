import React from 'react';
import MiddleGround from './middle-ground.jsx';
import PlayerPosition from './player.jsx';
import Paused from './paused.jsx';
import Header from './header.jsx';

export default class Board extends React.Component {
  render() {
    return (
      <div className='board-wrapper'>
        <Header score={this.props.score} />
        <Paused paused={this.props.paused} />
        <MiddleGround shots={this.props.shots} badGuys={this.props.badGuys} />
        <PlayerPosition playerPosition={this.props.playerPosition} />
      </div>
    )
  }
}
