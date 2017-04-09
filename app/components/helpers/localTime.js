import React, { PropTypes, Component } from 'react'
import dateFormat  from 'dateformat'

//Style
import style from './localTime.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getLocalTime() {
    if (!this.props.date) return "";
    return dateFormat(this.props.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")    
  }

  render() {
    let date = this.getLocalTime();
    return (
      <p>
        {date}
      </p>
    );
  }
}


export default App

