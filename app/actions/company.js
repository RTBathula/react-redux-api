import { browserHistory } from 'react-router'
import * as types from 'constants/company'
import * as companyApi from 'api/company'

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

export const toggleIsNewCompanySaving = (bool) => {
  return ({
    type               : types.COMPANY_NEW_ISSAVING,
    isNewCompanySaving : bool
  })
}

export const createNewCompanyAsync = (companyObj) => (dispatch, getState) => {   
	companyApi.createNewCompany(newCompany =>{		
	  	dispatch({ 
			type        : types.COMPANY_NEW_SUCCESS,
			newCompany  : newCompany
		})
	},error =>{
	  	dispatch({ 
			type  : types.COMPANY_NEW_FAILURE,
			error : error
		})
	}) 
}