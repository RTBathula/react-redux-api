import React, { PropTypes, Component } from 'react'

//Css
import layoutStyle from 'components/layout.css'
import style from './company.css'

class App extends Component { 

  render() {
    return ( 
    	<div className={layoutStyle.screenfull+' '+style.bodystrip+' horizontal-center'}>
        <div className={layoutStyle.screen980}>   
          <section className={style.bodyContainer}> 
            <p>Company list and details</p> 
            <div>                          
              <table className={'table table-hover '+style.companytable}>
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                  </tr>
                  <tr>
                    <td>July</td>
                    <td>Dooley</td>
                    <td>july@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div>                     
          </section>
        </div>
      </div>    	  	
    );
  }
}


export default App;
