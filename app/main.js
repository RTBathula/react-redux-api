import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import store from 'store/store'

//Custom
import CompanyList from './containers/companyList'
import CompanyDetails from './containers/companyDetails'

const history = syncHistoryWithStore(browserHistory, store)

render(	
	<Provider store={store}>
		<Router history = {history}>
		

			<Route path="/" component={CompanyList}/>
			<Route path="/:companyId" component={CompanyDetails}  />		
		</Router>				
	</Provider>,
document.getElementById('react-mount')
);
