import React from 'react';
import Shots from './shots.jsx';
import PlayerPosition from './player.jsx';
import Header from './header.jsx';

export default class Board extends React.Component {
  render() {
    return (
      <div className='board-wrapper'>
        <Header score={this.props.score} />
        <Shots shots={this.props.shots} />
        <PlayerPosition playerPosition={this.props.playerPosition} />
      </div>
    )
  }
}
