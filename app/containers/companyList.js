import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import * as companyActions from 'actions/company'

//Components
import Header from 'components/header/header'
import CompanyList from 'components/company/list/list'
import Footer from 'components/footer/footer'


class App extends Component { 

  render() {
    return ( 
    	<div>					
  			<Header/>
  			<CompanyList company={this.props.company} actions={this.props.actions}/>
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
