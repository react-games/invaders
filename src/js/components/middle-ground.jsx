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
    let badGuys = [];
    Object.keys(this.props.badGuys).forEach(offset => {
      this.props.badGuys[offset].map(badGuy => {
        badGuys.push(
          <div className='bad-guy' style={{left: offset, bottom: badGuy.y}} key={`bad-guy-${badGuy.key}`} />
        );
      });
    });
    return badGuys;
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
