import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

//Css
import layoutStyle from 'components/layout.css'
import style from './list.css'

import CreateCompanyModal from '../createCompanyModal/createCompanyModal'
import LocalTime from 'components/helpers/localTime'

class App extends Component { 

   constructor(props) {
    super(props);
    this.state = {     
      openCreateCompanyModel : false        
    }
  }

  componentWillMount() {
    if(this.props.company.list.length==0){         
      this.props.actions.getCompanyListAsync(this.props.company.skip,this.props.company.limit)
    }   
  }

  handleInfiniteLoad() {
    const { companyList } = this.refs;
    const scrollTop    = companyList.scrollTop;
    const clientHeight = companyList.clientHeight;
    const scrollHeight = companyList.scrollHeight;
    const contentHeight=scrollHeight-clientHeight;

    var isItemsFilledTable=false;
    if(this.props.company.list.length>=this.props.company.limit){
      isItemsFilledTable = true
    }    

    if(contentHeight==scrollTop && !this.props.company.isFetchingList && isItemsFilledTable){          
      this.props.actions.toggleIsFetchingCompanyList(true)
      this.props.actions.fetchMoreCompaniesAsync(this.props.company.skip,this.props.company.limit)
    }
  }

  render() {
    return (  
      <div className={layoutStyle.screenfull+' '+style.bodystrip+' horizontal-center'}>
        <div className={layoutStyle.screen980}>  

          {(!this.props.company.isTableLoading && !this.props.company.isTableLoadError) &&         
            <section className={style.listContainer}>
              <p>Company list and details</p> 
              <div style={{"width":"100%","margin":"2px 0px 7px 0px","height":"30px"}}>
                {/*Create button*/}
                <div style={{"height":"100%"}} className="pull-left">
                  <button onClick={() => this.setState({openCreateCompanyModel: true})} className={"default-inputfield " +style.createBtn}>
                    <i className="icon ion-plus"></i>&nbsp;
                    Create new company
                  </button>
                </div>

                {/*Loading,error, status bar*/}
                <div style={{"height":"100%","marginLeft":"14px"}}  className="pull-left vertical-center">
                  <div className={'flex-row-start-start'}>
                    <div>
                      {/*Spinner*/}
                      {this.props.company.isFetchingList && !this.props.company.fetchError &&
                        <span>
                          <i className="fa fa-circle-o-notch fa-spin fa-fw" style={{"fontSize":"18px"}}></i>
                        </span>
                      }

                      {/*Error-Warning*/}
                      {!this.props.company.isFetchingList && this.props.company.fetchError &&
                        <span>
                          <i className="fa fa-exclamation-triangle fa-fw" style={{"fontSize":"16px","color":"red"}}></i>
                        </span>
                      }

                    </div>

                    <div style={{"marginLeft":"4px"}}>

                      {/*Quering-Loading-Saving spinner*/}
                      {this.props.company.isFetchingList && !this.props.company.fetchError &&
                        <span style={{"fontSize":"14px"}}>Requesting...</span>
                      }

                      {/*Error text*/}
                      {!this.props.company.isFetchingList && this.props.company.fetchError &&
                        <span style={{"fontSize":"14px","color":"red"}}>{this.props.company.fetchError}</span>
                      }

                    </div>
                  </div>
                </div>

                {/*Table count*/}
                <div style={{"height":"100%","marginRight":"4px"}} className="pull-right vertical-center">
                  <div>  
                    <span>Now showing {this.props.company.list.length}</span>                            
                  </div>
                </div>
              </div>
               
                <div className={style.companyTableWrap} ref="companyList" onScroll={this.handleInfiniteLoad.bind(this)}>                          
                  <table className={'table table-hover '+style.companytable}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>createdAt</th>  
                        <th>Actions</th>                    
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.company.list.sort(function(a,b) {                      
                        return b.createdAt - a.createdAt 
                      }).map((obj, index)=> {
                        return  <tr  key={ index }>
                          <td>
                            <Link className="companyIdLink" to={'/'+obj._id } target="_blank">
                              <span>{obj._id}</span>
                            </Link>                          
                          </td>
                          <td>{obj.name}</td>
                          <td>
                            <LocalTime date={obj.createdAt} />
                          </td>
                          <td>
                            <Link className="companyIdLink" to={'/'+obj._id } target="_blank">
                              <span>View details</span>
                            </Link>
                          </td>                          
                        </tr>
                      })
                    }                     
                    </tbody>
                  </table>
                </div>                          
            </section> 
          }

          {(this.props.company.isTableLoading || this.props.company.isTableLoadError) &&
              <div className={style.listBootWrap+" flex-column-center"}>
                {this.props.company.isTableLoading && 
                  <div className={"flex-row-start-start"}>
                    <div>
                      <span>
                        <i className="fa fa-circle-o-notch fa-2x fa-spin fa-fw"></i>&nbsp;                    
                      </span>
                    </div>
                    <div style={{"marginTop":"2px"}}>
                      <span style={{"fontSize":"16px"}}>                    
                        Loading company list. Please wait...
                      </span>
                    </div>
                  </div>
                }

                {this.props.company.isTableLoadError && 
                  <div className={"flex-row-start-start"}>
                    <div>
                      <span>
                        <i className="fa fa-exclamation-triangle fa-2x"  aria-hidden="true"></i>&nbsp;                    
                      </span>
                    </div>
                    <div style={{"marginTop":"2px"}}>
                      <span style={{"fontSize":"16px"}}>                    
                        Unable to load the company table. Please refresh the page again
                      </span>
                    </div>
                  </div>
                } 

              </div>
            }    
              
        </div>

        {/*Create company model*/}
        <CreateCompanyModal  showModal={this.state.openCreateCompanyModel} hideModal={() => this.setState({openCreateCompanyModel: false})}/>
      </div>              	  	
    );
  }
}


export default App;
