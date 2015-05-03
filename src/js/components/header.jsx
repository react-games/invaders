import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='board-header'>
        <span>{`SCORE: ${this.props.score}`}</span>
      </div>
    )
  }
}
