import { browserHistory } from 'react-router'
import * as types from 'constants/user'
import * as userApi from 'api/user'

export const registerAsync = (email,password) => (dispatch, getState) => {   
	userApi.registerAsync(email, password,resp =>{
		browserHistory.push('/getstarted')
	  	dispatch({ 
			type  : types.USER_REGISTER_SUCCESS,
			email : resp
		})
	},error =>{
	  	dispatch({ 
			type  : types.USER_REGISTER_FAILURE,
			error : error
		})
	}) 
}


export const loginAsync = (email,password) => (dispatch, getState) => {   
	userApi.loginAsync(email, password,resp =>{
		browserHistory.push('/getstarted')
	  	dispatch({ 
			type  : types.USER_LOGIN_SUCCESS,
			email : resp
		})
	},error =>{
	  	dispatch({ 
			type  : types.USER_LOGIN_FAILURE,
			error : error
		})
	}) 
}