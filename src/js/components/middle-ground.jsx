import React from 'react';

let key=-1;

export default class MiddleGround extends React.Component {
  renderShots() {
    return this.props.shots.map(shot => {
      return <div className='shot' style={{left: `${shot.x}%`, bottom: shot.y}} key={`shot-${key++}`} />
    });
  }

  renderBadGuys() {
    return this.props.badGuys.map(badGuy => {
      return <div className='bad-guy' style={{left: `${badGuy.x}%`, bottom: badGuy.y}} key={`bad-guy-${key++}`} />
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
