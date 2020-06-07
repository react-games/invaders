import React, { Component } from 'react'

export default class Timer extends Component {
    constructor() {
    super();
    this.state= {
        cDown: 1
    };
    }
    
    render() {
        const minutes=Math.floor(this.props.minutes/60);
	const seconds=this.props.minutes- minutes*60;
        return (
            <div  className='countdown'>
                { minutes === 0 && seconds === 0
                    ? <h1>Time Up!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds}</h1>
                }
     	
                <audio controls autoplay>
  		<source src='./public/action.mp3' type="audio/mpeg"> </source>
		</audio>
		<div className='playmusic'>
                	PLEASE START THE MUSIC FOR BETTER EXPERIENCE
                </div>
            </div>
        )
    }
   } 
