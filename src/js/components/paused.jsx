import React from 'react';

const STYLES = {
  position: 'absolute',
  top: 250,
  left: 160,
  'font-size': '5em',
  'font-family': 'monospace',
  color: '#444',
  transform: 'rotate(-30deg)'
};

export default class Paused extends React.Component {
  render() {
    if (this.props.paused) {
      return <div style={STYLES}>[::PAUSED::]</div>
    } else {
      return <div />
    }
  }
}
