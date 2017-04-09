import React, { PropTypes, Component } from 'react'
import { Modal,Button,OverlayTrigger } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as helpers from 'helpers/util'

import * as companyActions from 'actions/company'

//Custom style
import style from './addBeneficialModal.css';
     

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {       
      name  : {
        value : "",
        error :""
      },
      email : {
        value : "",
        error :""
      } 
    }     
  }

  componentWillReceiveProps(nextProps) {    
    if(this.props.company.isAddingBeneficial && !nextProps.company.isAddingBeneficial && !nextProps.company.addingBeneficialErr){
      this.props.hideModal()
    }   
  }  

  bindInputData=(event,columnName)=>{    
    this.state[columnName].value = event.target.value 
    this.setState({
      [columnName] : this.state[columnName]
    })       
  }
  
  add =()=>{    
    let isValid = this._validate()
    if(isValid){
      let finalObj = {}
      finalObj.name    = this.state.name.value
      finalObj.email   = this.state.email.value

      this.props.actions.toggleIsAddingBeneficial(true)
      this.props.actions.addBeneficialAsync(this.props.company.companyDetails._id,finalObj)     
    }    
  } 

  _validate = () => {     

    this.state.name.error  = ""
    this.state.email.error = ""
    this.setState({
      name  : this.state.name,
      email : this.state.email
    })

    let isValid = true

    let txtMsg = helpers.validateTextField(this.state.name.value)
    if(txtMsg.error){
      this.state.name.error="Beneficial Name"+txtMsg.error   
      this.setState({
        name: this.state.name
      })
      isValid = false      
    }
    if(!txtMsg.error && txtMsg.txt){
      this.state.name.value = txtMsg.txt   
      this.setState({
        name: this.state.name
      })
    }  

    if(!this.state.email.value || !helpers.validarEmail(this.state.email.value)){
      this.state.email.error="Beneficial email is invalid";
      this.setState({
        email: this.state.email
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
          Add Beneficial
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{"width":"100%","height":"auto"}}>
          {/*Error bar*/} 
          {this.props.company.addingBeneficialErr &&
            <div className={'flex-row-start-start'} style={{"width":"100%","height":"25px","backgroundColor":"#ffc6c6"}}> 
              <div style={{"height":"100%","marginLeft":"9px","marginTop":"1.4px"}} className={'vertical-center'}>
                <span>
                  <i className="fa fa-exclamation-triangle fa-fw" style={{"fontSize":"14px","color":"red"}}></i>
                </span>
              </div>
              <div style={{"height":"100%","marginLeft":"3px"}} className={'vertical-center'}>
                <span style={{"fontSize":"14px","color":"red"}}>{this.props.company.addingBeneficialErr}</span>
              </div>
            </div>
          }
          

          {/*Form*/}
          <div style={{"width":"100%","marginTop":"2px"}}>    

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel} >
               <div>
                <span style={{"fontSize":"14px"}}>Beneficial Name</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.name.value} onChange={(event) => this.bindInputData(event,"name")}  placeholder="Enter the beneficial name" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.name.error}</span>
                </div>
              </div>
            </div>           
            

            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel}>
               <div>
                <span style={{"fontSize":"14px"}}>Beneficial Email</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.email.value} onChange={(event) => this.bindInputData(event,"email")}  placeholder="Enter the beneficial email" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.email.error}</span>
                </div>
              </div>
            </div>           

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.hideModal}>Cancel</Button> 
        {!this.props.company.isAddingBeneficial &&
          <button onClick={this.add} className={"default-inputfield " +style.addBtn}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;
            Add
          </button>
        }

        {this.props.company.isAddingBeneficial &&
          <button className={"default-inputfield " +style.addBtn}>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true"></i>&nbsp;
            Adding..
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



