import { browserHistory } from 'react-router'
import * as types from 'constants/company'
import * as companyApi from 'api/company'

export const getCompanyListAsync = (skip,limit) => (dispatch, getState) => {   
	companyApi.getList(skip,limit,list =>{		
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

export const toggleIsFetchingCompanyList = (bool) => {
  return ({
    type               : types.COMPANY_ISFETCHING,
    isFetchingList     : bool
  })
}

export const fetchMoreCompaniesAsync = (skip,limit) => (dispatch, getState) => {   
	companyApi.getList(skip,limit,list =>{		
	  	dispatch({ 
			type  : types.COMPANY_FETCH_SUCCESS,
			list  : list
		})
	},error =>{
	  	dispatch({ 
			type  : types.COMPANY_FETCH_FAILURE,
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
	companyApi.createNewCompany(companyObj,newCompany =>{		
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

export const fetchCompanyDetailsAsync = (companyId) => (dispatch, getState) => {   
	companyApi.fetchCompanyDetails(companyId,companyDetails =>{		
	  	dispatch({ 
			type            : types.COMPANY_FETCHDETAILS_SUCCESS,
			companyDetails  : companyDetails
		})
	},error =>{
	  	dispatch({ 
			type  : types.COMPANY_FETCHDETAILS_FAILURE,
			error : error
		})
	}) 
}

export const toggleIsCompanyInfoUpdating = (bool) => {
  return ({
    type                  : types.COMPANY_IS_UPDATING,
    isCompanyInfoUpdating : bool
  })
}

export const updateCompanyDetailsAsync = (companyId,updateObj) => (dispatch, getState) => {   
	companyApi.updateCompanyDetails(companyId,updateObj,updatedDetails =>{		
	  	dispatch({ 
			type            : types.COMPANY_UPDATEDETAILS_SUCCESS,
			updatedDetails  : updatedDetails
		})
	},error =>{
	  	dispatch({ 
			type  : types.COMPANY_UPDATEDETAILS_FAILURE,
			error : error
		})
	}) 
}