import { browserHistory } from 'react-router'
import * as types from 'constants/company'
import * as companyApi from 'api/company'


export const toggleIsFetchingCompanyList = (bool) => {
  return ({
    type           : types.COMPANY_GETLIST_ISFETCHING,
    isFetchingList : bool
  })
}

export const getCompanyListAsync = () => (dispatch, getState) => {   
	companyApi.getList(list =>{		
	  	dispatch({ 
			type  : types.COMPANY_GETLIST_SUCCESS,
			list  : list
		})
	},error =>{
	  	dispatch({ 
			type  : types.COMPANY_GETLIST_FAILURE,
			error : error
		})
	}) 
}
