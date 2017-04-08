import React, { PropTypes, Component } from 'react'
import { Modal,Button,OverlayTrigger } from 'react-bootstrap';


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
          <div className={'flex-row-start-start'} style={{"width":"100%","height":"25px","backgroundColor":"#ffc6c6"}}> 
            <div style={{"height":"100%","marginLeft":"9px","marginTop":"1.4px"}} className={'vertical-center'}>
              <span>
                <i className="fa fa-exclamation-triangle fa-fw" style={{"fontSize":"14px","color":"red"}}></i>
              </span>
            </div>
            <div style={{"height":"100%","marginLeft":"3px"}} className={'vertical-center'}>
              <span style={{"fontSize":"14px","color":"red"}}>hellow</span>
            </div>
          </div>

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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                  <input type="text" className={'default-inputfield '+style.inputNormal} />
                </div>
                <div>
                  <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
                </div>
              </div>
            </div>

            <div style={{"width":"100%","borderTop":"1px solid gray","margin":"10px 0px 10px 0px"}}>
            </div>
            <p style={{"fontSize":"14px","fontWeight":"600"}}>Company Directors(atleast 1)</p>

           {/*director suits*/}
           {
             this.state.directors.map((obj, index)=> {
                return <div key={ index }>
                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Director Name({index+1})</span>                     
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
                      </div>
                    </div>
                  </div>

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Director Email({index+1})</span>
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                    <button onClick={() => {this.addMoreMembers("directors")}} className={"default-inputfield " +style.createBtn}>
                      <i className="icon ion-plus"></i>&nbsp;
                      Add more
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
                return <div key={ index }>
                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Benefical Name({index+1})</span>                     
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
                      </div>
                    </div>
                  </div>

                  {/*inputSuite*/}
                  <div className={'flex-row-start-start '+style.inputSuite}>
                    <div className={'vertical-center '+style.inputLabel}>
                     <div>
                      <span style={{"fontSize":"14px"}}>Benefical Email({index+1})</span>
                     </div>
                    </div>
                    <div style={{"marginLeft":"3px"}}>
                      <div className={style.inputWrap}>
                        <input type="text" className={'default-inputfield '+style.inputNormal} />
                      </div>
                      <div>
                        <span style={{"color":"red","marginLeft":"1.5px"}}>company Name</span>
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
                    <button onClick={() => {this.addMoreMembers("beneficials")}}} className={"default-inputfield " +style.createBtn}>
                      <i className="icon ion-plus"></i>&nbsp;
                      Add more
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
      </Modal.Footer>
    </Modal>
    </div>  
    )
  }
}


export default App


