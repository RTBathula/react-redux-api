import React, { PropTypes, Component } from 'react'
import { Modal,Button,OverlayTrigger } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as helpers from 'helpers/util'

import * as companyActions from 'actions/company'

//Custom style
import style from './updateCompanyModal.css';
     

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {        
      address     : {
        value : "",
        error :""
      },
      city        : {
        value : "",
        error :""
      },
      country     : {
        value : "",
        error :""
      },
      email       : {
        value : "",
        error :""
      },
      phone       : {
        value : "",
        error :""
      }
    }
  }

  onEntered=()=>{  
    this.state.address.value = this.props.company.companyDetails.address
    this.state.city.value    = this.props.company.companyDetails.city
    this.state.country.value = this.props.company.companyDetails.country
    this.state.email.value   = this.props.company.companyDetails.email
    this.state.phone.value   = this.props.company.companyDetails.phone

    this.setState({
      address : this.state.address,
      city    : this.state.city,
      country : this.state.country,
      email   : this.state.email,
      phone   : this.state.phone,
    })
  } 

  componentWillReceiveProps(nextProps) {    
    console.log("nextProps")
    console.log(nextProps)
    if(this.props.company.isCompanyInfoUpdating && !nextProps.company.isCompanyInfoUpdating && !nextProps.company.companyInfoUpdatingErr){
      this.props.hideModal()
    }   
  }

  bindInputData=(event,columnName)=>{    
    this.state[columnName].value = event.target.value 
    this.setState({
      [columnName] : this.state[columnName]
    })       
  }
 
  update =()=>{    
    let isValid = this._validate()
    if(isValid){
      let finalObj = {}
    
      finalObj.address = this.state.address.value
      finalObj.city    = this.state.city.value
      finalObj.country = this.state.country.value
      finalObj.email   = this.state.email.value
      finalObj.phone   = this.state.phone.value   

      this.props.actions.toggleIsCompanyInfoUpdating(true)
      this.props.actions.updateCompanyDetailsAsync(this.props.company.companyDetails._id,finalObj)     
    }    
  } 

  _validate = () => {  
    //Nullify previous errors
    for (var prop in this.state) {
      if (this.state.hasOwnProperty(prop)) {
        this.state[prop].error = ""
        this.setState({
          [prop]: this.state[prop]
        })       
      }
    }

    let isValid = true  

    let txtMsg = helpers.validateTextField(this.state.address.value)
    if(txtMsg.error){
      this.state.address.error="Company Address"+txtMsg.error   
      this.setState({
        address: this.state.address
      })
      isValid = false      
    }
    if(!txtMsg.error && txtMsg.txt){
      this.state.address.value = txtMsg.txt   
      this.setState({
        address: this.state.address
      })
    } 

    txtMsg = helpers.validateTextField(this.state.city.value)
    if(txtMsg.error){
      this.state.city.error="Company City"+txtMsg.error   
      this.setState({
        city: this.state.city
      })
      isValid = false      
    }
    if(!txtMsg.error && txtMsg.txt){
      this.state.city.value = txtMsg.txt   
      this.setState({
        city: this.state.city
      })
    }  

    txtMsg = helpers.validateTextField(this.state.country.value)
    if(txtMsg.error){
      this.state.country.error="Company Country"+txtMsg.error   
      this.setState({
        country: this.state.country
      })
      isValid = false      
    }
    if(!txtMsg.error && txtMsg.txt){
      this.state.country.value = txtMsg.txt   
      this.setState({
        country: this.state.country
      })
    }  

    if(this.state.email.value && !helpers.validarEmail(this.state.email.value)){
      this.state.email.error="Company email is invalid";
      this.setState({
        email: this.state.email
      })
      isValid = false
    }         

    if(this.state.phone.value && (this.state.phone.value.length <9 || this.state.phone.value.length>9)){
      this.state.phone.error="Company phone should atleast of 9 digits";
      this.setState({
        phone: this.state.phone
      })
      isValid = false
    }    

    if(isNaN(this.state.phone.value)){
      this.state.phone.error ="Company should be in digits";
      this.setState({
        phone: this.state.phone
      })
      isValid = false
    }     
   
    return isValid
  } 

  render() {   
    return (   
    <div> 
     <Modal onEntered={this.onEntered} backdrop={"static"} keyboard={false} show={this.props.showModal} onHide={this.props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Update company info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{"width":"100%","height":"auto"}}>
          {/*Error bar*/} 
          {this.props.company.companyInfoUpdatingErr &&
            <div className={'flex-row-start-start'} style={{"width":"100%","height":"25px","backgroundColor":"#ffc6c6"}}> 
              <div style={{"height":"100%","marginLeft":"9px","marginTop":"1.4px"}} className={'vertical-center'}>
                <span>
                  <i className="fa fa-exclamation-triangle fa-fw" style={{"fontSize":"14px","color":"red"}}></i>
                </span>
              </div>
              <div style={{"height":"100%","marginLeft":"3px"}} className={'vertical-center'}>
                <span style={{"fontSize":"14px","color":"red"}}>{this.props.company.companyInfoUpdatingErr}</span>
              </div>
            </div>
          }
          

          {/*Form*/}
          <div style={{"width":"100%","marginTop":"2px"}}>                      

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel} >
               <div>
                <span style={{"fontSize":"14px"}}>Company Address</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.address.value} onChange={(event) => this.bindInputData(event,"address")}  placeholder="Enter the company address" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.address.error}</span>
                </div>
              </div>
            </div>

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel} >
               <div>
                <span style={{"fontSize":"14px"}}>Company City</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.city.value} onChange={(event) => this.bindInputData(event,"city")}  placeholder="Enter the company city" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.city.error}</span>
                </div>
              </div>
            </div>

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel} >
               <div>
                <span style={{"fontSize":"14px"}}>Company Country</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.country.value} onChange={(event) => this.bindInputData(event,"country")}  placeholder="Enter the company country" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.country.error}</span>
                </div>
              </div>
            </div>

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel}>
               <div>
                <span style={{"fontSize":"14px"}}>Company Email</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.email.value} onChange={(event) => this.bindInputData(event,"email")}  placeholder="Enter the company email" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.email.error}</span>
                </div>
              </div>
            </div>

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel}>
               <div>
                <span style={{"fontSize":"14px"}}>Company Phone</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="number" value={this.state.phone.value} onChange={(event) => this.bindInputData(event,"phone")}  placeholder="Enter the company phone" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.phone.error}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.hideModal}>Cancel</Button> 
        {!this.props.company.isCompanyInfoUpdating &&
          <button onClick={this.update} className={"default-inputfield " +style.updateBtn}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;
            Update
          </button>
        }

        {this.props.company.isCompanyInfoUpdating &&
          <button className={"default-inputfield " +style.updateBtn}>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true"></i>&nbsp;
            Updating..
          </button>
        }
                
      </Modal.Footer>
    </Modal>
    </div>  
    )
  }
}

const mapStateToProps = state => ({
  company : state.company
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(companyActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



