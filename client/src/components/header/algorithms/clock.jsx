import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    // Update the clock every second
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    // Clear the interval to avoid memory leaks
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    const { time } = this.state;
    const hour = time.getHours();
    const minute = time.getMinutes();
    const meridium = hour>=12 ?  'PM' : 'AM';
    const formatHour = hour%12 || 12;

    console.log({meridium});
    return (
      <div className="clock">
        {/* <p>{time.toLocaleTimeString()}</p> */}
        <p className="clockTime">{formatHour}:{minute < 10 ? '0' : ''}{minute}{meridium}</p>
      </div>
    );
  }
}

export default Clock;
