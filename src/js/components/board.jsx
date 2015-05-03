import React from 'react';

let key=-1;

class Board extends React.Component {
  renderHeader() {
    return (
      <div className='board-header'>
        <span>{`Score: ${this.props.score}`}</span>
      </div>
    )
  }

  renderShots() {
    return this.props.shots.map(shot => {
      return <div className='shot' style={{left: `${shot.x}%`, bottom: shot.y}} key={key++} />
    });
  }

  renderBoardBody() {
    return (
      <div className='middle-ground'>
        { this.renderShots() }
      </div>
    )
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
      <div className='board-wrapper'>
        { this.renderHeader() }
        { this.renderBoardBody() }
        { this.renderPlayerRow() }
      </div>
    );
  }
}

export default Board;
