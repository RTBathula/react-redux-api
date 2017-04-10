import React, { PropTypes, Component } from 'react'
import { Modal,Button,OverlayTrigger } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as helpers from 'helpers/util'

import * as companyActions from 'actions/company'

//Custom style
import style from './createCompanyModal.css';
     

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {    
      name        : {
        value : "",
        error :""
      },
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
      },
      directors   : [{
        name  : {
          value : "",
          error :""
        },
          email : {
          value : "",
          error :""
        }
      }],
      beneficials :[{
          name  : {
          value : "",
          error :""
        },
          email : {
          value : "",
          error :""
        }
      }]  
    }
  }

  componentWillReceiveProps(nextProps) {    
    if(this.props.company.isNewCompanySaving && !nextProps.company.isNewCompanySaving && !nextProps.company.newCompanySavingErr){
      this.props.hideModal()
    }   
  }

  addMoreMembers=(columnName)=>{  
    this.state[columnName].push({
        name  : {
          value : "",
          error :""
        },
          email : {
          value : "",
          error :""
        }
    })

    this.setState({
      [columnName] : this.state[columnName]
    })     
  } 

  removeMembers=(columnName,index)=>{  
    if(index!=0){     
      this.state[columnName].splice(index,1)   
      this.setState({
        [columnName] : this.state[columnName]
      })
    }        
  }   

  bindInputData=(event,columnName)=>{    
    this.state[columnName].value = event.target.value 
    this.setState({
      [columnName] : this.state[columnName]
    })       
  }

  bindMemberInputData=(event,columnName,index,subColumnName)=>{    
    this.state[columnName][index][subColumnName].value = event.target.value 
    this.setState({
      [columnName] : this.state[columnName]
    })       
  } 
 
  create =()=>{    
    let isValid = this._validate()
    if(isValid){
      let finalObj = {}
      finalObj.name    = this.state.name.value
      finalObj.address = this.state.address.value
      finalObj.city    = this.state.city.value
      finalObj.country = this.state.country.value
      finalObj.email   = this.state.email.value
      finalObj.phone   = this.state.phone.value

      finalObj.directors = []
      for(var i=0;i<this.state.directors.length;++i){
        let name  = this.state.directors[i].name.value 
        let email = this.state.directors[i].email.value   
        finalObj.directors.push({
          name  : name,
          email : email
        }) 
      }

      finalObj.beneficials = []
      for(var i=0;i<this.state.beneficials.length;++i){
        let name  = this.state.beneficials[i].name.value 
        let email = this.state.beneficials[i].email.value   
        finalObj.beneficials.push({
          name  : name,
          email : email
        }) 
      } 

      this.props.actions.toggleIsNewCompanySaving(true)
      this.props.actions.createNewCompanyAsync(finalObj)     
    }    
  } 

  _validate = () => {  
    //Nullify previous errors
    for (var prop in this.state) {
      if (this.state.hasOwnProperty(prop) && prop!="directors" && prop!="beneficials") {
        this.state[prop].error = ""
        this.setState({
          [prop]: this.state[prop]
        })       
      }
    }

    for(var i=0;i<this.state.directors.length;++i){
      this.state.directors[i].name.error = ""
      this.state.directors[i].email.error = ""     
    }

    this.setState({
      directors: this.state.directors
    })

    for(var i=0;i<this.state.beneficials.length;++i){
      this.state.beneficials[i].name.error = ""
      this.state.beneficials[i].email.error = ""      
    }
    this.setState({
      beneficials: this.state.beneficials
    })


    let isValid = true

    let txtMsg = helpers.validateTextField(this.state.name.value)
    if(txtMsg.error){
      this.state.name.error="Company Name"+txtMsg.error   
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

    txtMsg = helpers.validateDefaultTextField(this.state.address.value)
    if(txtMsg.error){
      this.state.address.error="Company Address"+txtMsg.error   
      this.setState({
        address: this.state.address
      })
      isValid = false      
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

    var uniqueDirectors = []
    for(var i=0;i<this.state.directors.length;++i){
      let name  =  this.state.directors[i].name.value
      let email = this.state.directors[i].email.value

      if(i==0){
        let foundIndex=uniqueDirectors.indexOf(email)
        if(foundIndex>-1){
          this.state.directors[i].email.error="Duplicate director email(it should be unique)"       
          isValid = false  
        }
        if(foundIndex<0){
          uniqueDirectors.push(email)
        }
        if(!helpers.validarEmail(email)){
          this.state.directors[i].email.error="Invalid director email"      
          isValid = false
        } 

        txtMsg = helpers.validateTextField(name)
        if(txtMsg.error){
          this.state.directors[i].name.error="Director Name"+txtMsg.error          
          isValid = false      
        }
        if(!txtMsg.error && txtMsg.txt){
          this.state.directors[i].name.value = txtMsg.txt          
        }
      }

      if(i!=0 && email && email!=""){
        let foundIndex=uniqueDirectors.indexOf(email)
        if(foundIndex>-1){
          this.state.directors[i].email.error="Duplicate director email(it should be unique)"       
          isValid = false  
        }
        if(foundIndex<0){
          uniqueDirectors.push(email)
        }
        if(!helpers.validarEmail(email)){
          this.state.directors[i].email.error="Invalid director email"      
          isValid = false
        } 
      }
      if(i!=0 && name && name!=""){
        txtMsg = helpers.validateTextField(name)
        if(txtMsg.error){
          this.state.directors[i].name.error="Director Name"+txtMsg.error          
          isValid = false      
        }
        if(!txtMsg.error && txtMsg.txt){
          this.state.directors[i].name.value = txtMsg.txt          
        }
      }
      
    } 

    this.setState({
      directors: this.state.directors
    }) 

    var uniqueBeneficials = []
    for(var i=0;i<this.state.beneficials.length;++i){
      let name  =  this.state.beneficials[i].name.value
      let email = this.state.beneficials[i].email.value

      if(i==0){
        let foundIndex=uniqueBeneficials.indexOf(email)
        if(foundIndex>-1){
          this.state.beneficials[i].email.error="Duplicate beneficial email(it should be unique)"       
          isValid = false  
        }
        if(foundIndex<0){
          uniqueBeneficials.push(email)
        }
        if(!helpers.validarEmail(email)){
          this.state.beneficials[i].email.error="Invalid beneficial email"      
          isValid = false
        }
        txtMsg = helpers.validateTextField(name)
        if(txtMsg.error){
          this.state.beneficials[i].name.error="Beneficial Name"+txtMsg.error          
          isValid = false      
        }
        if(!txtMsg.error && txtMsg.txt){
          this.state.beneficials[i].name.value = txtMsg.txt          
        }      
      }
      
      if(i!=0 && email && email!=""){
        let foundIndex=uniqueBeneficials.indexOf(email)
        if(foundIndex>-1){
          this.state.beneficials[i].email.error="Duplicate beneficial email(it should be unique)"       
          isValid = false  
        }
        if(foundIndex<0){
          uniqueBeneficials.push(email)
        }
        if(!helpers.validarEmail(email)){
          this.state.beneficials[i].email.error="Invalid beneficial email"      
          isValid = false
        }
      }

      if(i!=0 && name && name!=""){
        txtMsg = helpers.validateTextField(name)
        if(txtMsg.error){
          this.state.beneficials[i].name.error="Beneficial Name"+txtMsg.error          
          isValid = false      
        }
        if(!txtMsg.error && txtMsg.txt){
          this.state.beneficials[i].name.value = txtMsg.txt          
        }
      }
       
    } 

    this.setState({
      beneficials: this.state.beneficials
    })  
   
    return isValid
  } 

  render() {
    return (   
    <div> 
     <Modal onEntered={this.onEntered} backdrop={"static"} keyboard={false} show={this.props.showModal} onHide={this.props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Create new company
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{"width":"100%","height":"auto"}}>
          {/*Error bar*/} 
          {this.props.company.newCompanySavingErr &&
            <div className={'flex-row-start-start'} style={{"width":"100%","height":"25px","backgroundColor":"#ffc6c6"}}> 
              <div style={{"height":"100%","marginLeft":"9px","marginTop":"1.4px"}} className={'vertical-center'}>
                <span>
                  <i className="fa fa-exclamation-triangle fa-fw" style={{"fontSize":"14px","color":"red"}}></i>
                </span>
              </div>
              <div style={{"height":"100%","marginLeft":"3px"}} className={'vertical-center'}>
                <span style={{"fontSize":"14px","color":"red"}}>{this.props.company.newCompanySavingErr}</span>
              </div>
            </div>
          }
          

          {/*Form*/}
          <div style={{"width":"100%","marginTop":"2px"}}>
            {/*inputSuite*/}
            <div className={'flex-row-start-start '+style.inputSuite}>
              <div className={'vertical-center '+style.inputLabel}>
               <div>
                <span style={{"fontSize":"14px"}}>Company Name</span>
               </div>
              </div>
              <div style={{"marginLeft":"3px"}}>
                <div className={style.inputWrap}>
                  <input type="text" value={this.state.name.value} onChange={(event) => this.bindInputData(event,"name")}  placeholder="Enter the company name" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state.name.error}</span>
                </div>
              </div>
            </div>

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
                <span style={{"fontSize":"14px"}}>Company Email(optional)</span>
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
                <span style={{"fontSize":"14px"}}>Company Phone(optional)</span>
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

            <div style={{"width":"100%","borderTop":"1px solid gray","margin":"10px 0px 10px 0px"}}>
            </div>
            <p style={{"fontSize":"14px","fontWeight":"600"}}>Company Directors(atleast 1)</p>

           {/*director suits*/}
           {
             this.state.directors.map((obj, index)=> {
                return <div key={ index } className={style.membersBox} >
                  {index!=0 &&
                    <div style={{"width":"100%"}} className={'flex-row-end-center '}>
                      <div>
                        <span onClick={() => {this.removeMembers("directors",index)}} style={{"fontSize":"12px","textDecoration":"underline","color":"red","cursor":"pointer"}}>
                        Remove
                        </span>                     
                      </div>
                    </div>
                  }                  

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Director Name</span>                     
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" value={this.state["directors"][index].name.value} onChange={(event) => this.bindMemberInputData(event,"directors",index,"name")}  placeholder="Enter the director name" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state["directors"][index].name.error}</span>
                      </div>
                    </div>
                  </div>

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Director Email</span>
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" value={this.state["directors"][index].email.value} onChange={(event) => this.bindMemberInputData(event,"directors",index,"email")}  placeholder="Enter the director email" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state["directors"][index].email.error}</span>
                      </div>
                    </div>
                  </div>
                </div>
             })     

           }     

            <div>
              {/*add more directors button*/}
              <div className={'flex-row-start-start '+style.inputSuite}>
                <div className={'vertical-center '+style.inputLabel}>                 
                </div>
                <div style={{"marginLeft":"3px"}}>
                  <div className={style.inputWrap}>
                    <button onClick={() => {this.addMoreMembers("directors")}} className={"default-inputfield "}>
                      <i className="icon ion-plus"></i>&nbsp;
                      Add more directors
                    </button>
                  </div>                  
                </div>
              </div>
            </div>


            <div style={{"width":"100%","borderTop":"1px solid gray","margin":"10px 0px 10px 0px"}}>
            </div>
            <p style={{"fontSize":"14px","fontWeight":"600"}}>Company Beneficals(atleast 1)</p>

           {/*benefical suits*/}
           {
             this.state.beneficials.map((obj, index)=> {
                return <div key={ index } className={style.membersBox} >
                  {index!=0 &&
                    <div style={{"width":"100%"}} className={'flex-row-end-center '}>
                      <div>
                        <span onClick={() => {this.removeMembers("beneficials",index)}} style={{"fontSize":"12px","textDecoration":"underline","color":"red","cursor":"pointer"}}>
                        Remove
                        </span>                     
                      </div>
                    </div>
                  } 

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Benefical Name</span>                     
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" value={this.state["beneficials"][index].name.value} onChange={(event) => this.bindMemberInputData(event,"beneficials",index,"name")}  placeholder="Enter the beneficial name" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state["beneficials"][index].name.error}</span>
                      </div>
                    </div>
                  </div>

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Benefical Email</span>
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" value={this.state["beneficials"][index].email.value} onChange={(event) => this.bindMemberInputData(event,"beneficials",index,"email")}  placeholder="Enter the beneficial email" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>{this.state["beneficials"][index].email.error}</span>
                      </div>
                    </div>
                  </div>
                </div>
             })     

           }     

            <div>
              {/*add more beneficials button*/}
              <div className={'flex-row-start-start '+style.inputSuite}>
                <div className={'vertical-center '+style.inputLabel}>                 
                </div>
                <div style={{"marginLeft":"3px"}}>
                  <div className={style.inputWrap}>
                    <button onClick={() => {this.addMoreMembers("beneficials")}} className={"default-inputfield "}>
                      <i className="icon ion-plus"></i>&nbsp;
                      Add more beneficials
                    </button>
                  </div>                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.hideModal}>Cancel</Button> 
        {!this.props.company.isNewCompanySaving &&
          <button onClick={this.create} className={"default-inputfield " +style.createBtn}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;
            Create
          </button>
        }

        {this.props.company.isNewCompanySaving &&
          <button className={"default-inputfield " +style.createBtn}>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true"></i>&nbsp;
            Creating..
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



