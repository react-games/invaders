import React from 'react';

let key=-1;

export default class Shots extends React.Component {
  renderShots() {
    return this.props.shots.map(shot => {
      return <div className='shot' style={{left: `${shot.x}%`, bottom: shot.y}} key={key++} />
    });
  }

  render() {
    return (
      <div className='middle-ground'>
        { this.renderShots() }
      </div>
    );
  }
}
