import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import * as companyActions from 'actions/company'

//Components
import Header from 'components/header/header'
import CompanyDetails from 'components/company/details/details'
import Footer from 'components/footer/footer'


class App extends Component { 

  render() {
    return ( 
    	<div>					
  			<Header/>
  			<CompanyDetails company={this.props.company} actions={this.props.actions}/>
  			<Footer/>				
  		</div>   	    
    );
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
