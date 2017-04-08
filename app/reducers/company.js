import * as types from 'constants/company'

const initialState = {
  isTableLoading   : true,
  isTableLoadError : null,

  isFetchingList   : false,  
  fetchError       : null,
  skip             : 0,
  limit            : 50,
  list             : [],

  isNewCompanySaving  : false,
  newCompanySavingErr : null,    
}

export default function company(state = initialState, action) {
  switch (action.type) {    

    case types.COMPANY_GETLIST_SUCCESS:      
      return {       
      	...state,
        isTableLoading : false,       
        list           : action.list             
      }
    case types.COMPANY_GETLIST_FAILURE:
      return {       
        ...state,      
        isTableLoading   : false, 
        isTableLoadError : action.error       
      } 

    case types.COMPANY_NEW_ISSAVING:

      return {
        ...state,
        isNewCompanySaving : action.isNewCompanySaving
      } 

    case types.COMPANY_NEW_SUCCESS:      
      return {       
        ...state,
        isNewCompanySaving : false,       
        list               : [action.newCompany]             
      }
    
    case types.COMPANY_NEW_FAILURE:
      return {       
        ...state,      
        isNewCompanySaving   : false, 
        newCompanySavingErr  : action.error       
      }   

 
    default:
      return state
  }
}