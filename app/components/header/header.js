import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

//Css
import layoutStyle from 'components/layout.css'
import style from './header.css'

class App extends Component { 

    constructor(props) {
        super(props)   
        this.state = {                                 
        }
    }
   
    render() {
        return ( 		
            <div className={layoutStyle.screenfull+' '+style.headstrip+' horizontal-center'}>
              <div className={layoutStyle.screen980}>   
                <header className={style.headerContainer}> 
                    <div className={style.title +" vertical-center"}>
                        <span>Clearhaus frontend</span>   
                    </div>            
                </header>
              </div>
            </div>    	  	
        );
  }
}

export default App;
