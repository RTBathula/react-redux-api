import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

//Css
import layoutStyle from 'components/layout.css'
import style from './details.css'

import Maininfo from './info/info'
import Directors from './directors/directors'
import Beneficials from './beneficials/beneficials'

class App extends Component { 

   constructor(props) {
    super(props);
    this.state = {                
    }
  }

  componentWillMount() {   
    if(this.props.params.companyId && this.props.params.companyId!=""){
      this.props.actions.fetchCompanyDetailsAsync(this.props.params.companyId) 
    }
  }

  render() {
    return (  
      <div className={layoutStyle.screenfull+' '+style.bodystrip+' horizontal-center'}>
        <div className={layoutStyle.screen980}>  
          {(!this.props.company.isCompanyDetailsFetching && !this.props.company.companyDetailsFetchingErr) &&  
            <div>
              <Maininfo company={this.props.company} actions={this.props.actions}/>
              <Directors company={this.props.company} />
              <Beneficials company={this.props.company} actions={this.props.actions}/>
            </div>
          }
          

          {(this.props.company.isCompanyDetailsFetching || this.props.company.companyDetailsFetchingErr) &&
            <div className={style.detailsBootWrap+" flex-column-center"}>
                  {this.props.company.isCompanyDetailsFetching && 
                    <div className={"flex-row-start-start"}>
                      <div>
                        <span>
                          <i className="fa fa-circle-o-notch fa-2x fa-spin fa-fw"></i>&nbsp;                    
                        </span>
                      </div>
                      <div style={{"marginTop":"2px"}}>
                        <span style={{"fontSize":"16px"}}>                    
                          Loading company details. Please wait...
                        </span>
                      </div>
                    </div>
                  }

                  {this.props.company.companyDetailsFetchingErr && 
                    <div className={"flex-row-start-start"}>
                      <div>
                        <span>
                          <i className="fa fa-exclamation-triangle fa-2x"  aria-hidden="true"></i>&nbsp;                    
                        </span>
                      </div>
                      <div style={{"marginTop":"2px"}}>
                        <span style={{"fontSize":"16px"}}>                    
                          Unable to load the company details. Please refresh the page again.
                          ErrorMessage from server: {this.props.company.companyDetailsFetchingErr}
                        </span>
                      </div>
                    </div>
                  } 
            </div>
          }

        </div>
      </div>              	  	
    );
  }
}


export default App;
