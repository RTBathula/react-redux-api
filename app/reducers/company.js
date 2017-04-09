import * as types from 'constants/company'

const initialState = {
  isTableLoading   : true,
  isTableLoadError : null,

  isFetchingList   : false,  
  fetchError       : null,
  skip             : 0,
  limit            : 10,
  list             : [],

  isNewCompanySaving  : false,
  newCompanySavingErr : null, 

  isCompanyDetailsFetching  : true,
  companyDetailsFetchingErr : null, 
  companyDetails            : {},

  isCompanyInfoUpdating  : false,
  companyInfoUpdatingErr : null  
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

    case types.COMPANY_ISFETCHING:

      return {
        ...state,
        isFetchingList  : action.isFetchingList,
        fetchError      : null
      } 

    case types.COMPANY_FETCH_SUCCESS:           
      return {       
        ...state,
        isFetchingList     : false,       
        list               : [...state.list,...action.list],
        skip               : [...state.list,...action.list].length            
      }

    case types.COMPANY_FETCH_FAILURE:      
      return {       
        ...state,
        isFetchingList     : false,       
        fetchError         : action.error             
      }    

    case types.COMPANY_NEW_ISSAVING:

      return {
        ...state,
        isNewCompanySaving  : action.isNewCompanySaving,
        newCompanySavingErr : null
      } 

    case types.COMPANY_NEW_SUCCESS:      
      return {       
        ...state,
        isNewCompanySaving : false,       
        list               : [...state.list,action.newCompany]             
      }
    
    case types.COMPANY_NEW_FAILURE:
      return {       
        ...state,      
        isNewCompanySaving   : false, 
        newCompanySavingErr  : action.error       
      } 

    case types.COMPANY_FETCHDETAILS_SUCCESS:      
      return {       
        ...state,
        isCompanyDetailsFetching : false,       
        companyDetails           : action.companyDetails        
      }

    case types.COMPANY_FETCHDETAILS_FAILURE:
      return {       
        ...state,      
        isCompanyDetailsFetching   : false, 
        companyDetailsFetchingErr  : action.error       
      }  

    case types.COMPANY_IS_UPDATING:

      return {
        ...state,
        isCompanyInfoUpdating  : action.isCompanyInfoUpdating,
        companyInfoUpdatingErr : null
      } 

    case types.COMPANY_UPDATEDETAILS_SUCCESS:      
      return {       
        ...state,
        isCompanyInfoUpdating    : false,       
        companyDetails           : {
          ...state.companyDetails,
          address  : action.updatedDetails.address,
          city     : action.updatedDetails.city,
          country  : action.updatedDetails.country,
          email    : action.updatedDetails.email,
          phone    : action.updatedDetails.phone
        }       
      }

    case types.COMPANY_UPDATEDETAILS_FAILURE:
      return {       
        ...state,      
        isCompanyInfoUpdating      : false, 
        companyInfoUpdatingErr     : action.error       
      }        

 
    default:
      return state
  }
}