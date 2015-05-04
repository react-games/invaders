import React from 'react';

export default class PlayerPosition extends React.Component {
  render() {
    return (
      <div className='player-row'>
        <div className='inner-player-row'>
          <div className='player' style={{left: `${this.props.playerPosition}`}}/>
        </div>
      </div>
    )
  }
}
