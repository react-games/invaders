import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='board-header'>
        <span className='score'>{`SCORE: ${this.props.score}`}</span>
        <span className='instructions'>{'z - left, x - right,  <shift> - shoot,  <spacebar> - pause'}</span>
      </div>
    )
  }
}
