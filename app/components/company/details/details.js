import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

//Css
import layoutStyle from 'components/layout.css'
import style from './details.css'

import CreateCompanyModal from '../createCompanyModal/createCompanyModal'
import LocalTime from 'components/helpers/localTime'

class App extends Component { 

   constructor(props) {
    super(props);
    this.state = {                
    }
  }

  componentWillMount() {      
  }

  render() {
    return (  
      <div className={layoutStyle.screenfull+' '+style.bodystrip+' horizontal-center'}>
        <div className={layoutStyle.screen980}>  
        </div>
      </div>              	  	
    );
  }
}


export default App;
