import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

//Css
import style from '../details.css'
import beneficialsStyle from './beneficials.css'


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
        
        <div className={style.detailsBx}>
          <div className={"flex-row-start-start"}>
            <div style={{"height":"20px"}} className={"vertical-center"}>
              <span style={{"fontSize":"17px","fontWeight":"500"}}>Beneficials owners</span>
            </div>
            <div style={{"height":"20px","marginLeft":"2px"}} className={"vertical-center"}>
              <span style={{"color":"blue","textDecoration":"underline","cursor":"pointer"}}>(Edit)</span>
            </div>           
          </div>
          <div style={{"borderTop":"1px solid gray","margin":"6px 0px 6px 0px","width":"100%"}}>
          </div>

          <div className={beneficialsStyle.listWrap}>
            {
              this.props.company.companyDetails.beneficials.map((obj, index)=> {
                return  <div key={ index } className={beneficialsStyle.suiteInfoWrap}>
                  <div className={"flex-row-start-start "+style.keyvalueWrap}>
                    <div className={style.key}>
                      <span>Name:</span>
                    </div>
                    <div className={style.value}>
                      <span>{obj.name}</span>
                    </div>
                  </div>

                  <div className={"flex-row-start-start "+style.keyvalueWrap}>
                    <div className={style.key}>
                      <span>Email:</span>
                    </div>
                    <div className={style.value}>
                      <span>{obj.email}</span>
                    </div>
                  </div>          
                </div>
              })
            }                         

          </div>

        </div>              	  	
    );
  }
}


export default App;
