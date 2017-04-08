import * as types from 'constants/user'

const initialState = {
  isRegistering : false,
  error         : null,
  email         : null  
}

export default function user(state = initialState, action) {
  switch (action.type) {

    case types.USER_REGISTER_SUCCESS:      
      return {       
      	...state,
        isRegistering : false,
        email         : action.email
      }
    case types.USER_REGISTER_FAILURE:
      return {       
        ...state,
        isRegistering : false,
        error         : action.error
      }  
 
    default:
      return state
  }
}