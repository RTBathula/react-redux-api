import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

//Css
import layoutStyle from 'components/layout.css'
import style from './footer.css'

class App extends Component { 

    constructor(props) {
        super(props)   
        this.state = {                                 
        }
    }
   
    render() {
        return (        
            <div className={layoutStyle.screenfull+' '+style.footstrip+' horizontal-center'}>
              <div className={layoutStyle.screen980}>   
                <footer className={style.footContainer}> 
                    <div className={style.title +" vertical-center"}>
                        <span>Developed by RT Bathula</span>   
                    </div>            
                </footer>
              </div>
            </div>          
        );
  }
}

export default App;
