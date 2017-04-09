import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

//Css
import layoutStyle from 'components/layout.css'
import style from '../details.css'
import infoStyle from './info.css'

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
        
        <div className={style.detailsBx}>
          <div className={"flex-row-start-start"}>
            <div style={{"height":"20px"}} className={"vertical-center"}>
              <span style={{"fontSize":"17px","fontWeight":"500"}}>Details</span>
            </div>
            <div style={{"height":"20px","marginLeft":"2px"}} className={"vertical-center"}>
              <span style={{"color":"blue","textDecoration":"underline","cursor":"pointer"}}>(Edit)</span>
            </div>
          </div>
          <div style={{"borderTop":"1px solid gray","margin":"6px 0px 6px 0px","width":"100%"}}>
          </div>

          <div>
            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Id:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails._id}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Name:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.name}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Address:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.address}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company City:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.city}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Country:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.country}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Email:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.email}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Company Phone:</span>
              </div>
              <div className={style.value}>
                <span>{this.props.company.companyDetails.phone}</span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Created On:</span>
              </div>
              <div className={style.value}>
                <span>
                   <LocalTime date={this.props.company.companyDetails.createdAt} />
                </span>
              </div>
            </div>

            <div className={"flex-row-start-start "+style.keyvalueWrap}>
              <div className={style.key}>
                <span>Last Updated On:</span>
              </div>
              <div className={style.value}>
                <span>
                  <LocalTime date={this.props.company.companyDetails.updatedAt} />
                </span>
              </div>
            </div>

          </div>

        </div>              	  	
    );
  }
}


export default App;
