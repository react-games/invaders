import React from 'react';
import {extend} from 'lodash';

export default class MiddleGround extends React.Component {
  renderShots() {
    let shots = [];
    Object.keys(this.props.shots).forEach(offset => {
      this.props.shots[offset].map(shot => {
        shots.push(
          <div className='shot' style={{left: offset, bottom: shot.y}} key={`shot-${shot.key}`} />
        );
      });
    });
    return shots
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
