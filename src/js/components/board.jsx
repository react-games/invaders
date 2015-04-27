import React from 'react';

class Board extends React.Component {
  renderHeader() {
    return (
      <div className='board-header'>
        <span>{`Score: ${this.props.score}`}</span>
      </div>
    )
  }

  renderBoardBody() {

  }

  renderPlayerRow() {
    return (
      <div className='player-row'>
        <div className='inner-player-row'>
          <div className='player' style={{left: `${this.props.playerPosition}%`}}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='board-wrapper' onKeyPress={this.props.onKeyPress} tabIndex="0" autoFocus>
        { this.renderHeader() }
        { this.renderPlayerRow() }
      </div>
    );
  }
}

export default Board;