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
      return (
        <div className='bad-guy' style={{left: badGuy.x, bottom: badGuy.y}} key={`bad-guy-${badGuy.key}`} />
      )
    });
  }

  render() {
    return (
      <div className='middle-ground'>
        { this.renderShots() }
        { this.renderBadGuys() }
      </div>
    )
  }
}
