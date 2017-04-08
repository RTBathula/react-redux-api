import * as types from 'constants/company'

const initialState = {
  isTableLoading   : true,
  isTableLoadError : null,

  isFetchingList   : false,  
  fetchError       : null,
  skip             : 0,
  limit            : 50,
  list             : []  
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

    case types.COMPANY_GETLIST_ISFETCHING:

      return {
        ...state,
        isFetchingList : action.isFetchingList
      }   
 
    default:
      return state
  }
}