import baseURL from 'config/keys'
import request from 'superagent'
import * as util from 'helpers/util'

export const registerAsync = (email, password, successCB,errorCB) => {	 
  return request
  .post(baseURL+'/user')  
  .send(JSON.stringify({
      "email"    : email,
      "password" : password
  }))   
  .end(function(err, reply){ 
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp)
    } else {       
      util.setTokenInCookie(resp.result.data);
      successCB(resp)
    }
  })
}

export const loginAsync = (email, password, successCB,errorCB) => {   
  return request
  .post(baseURL+'/user/login')  
  .send(JSON.stringify({
      "email"    : email,
      "password" : password
  }))   
  .end(function(err, reply){ 
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp)
    } else {       
      util.setTokenInCookie(resp.result.data);
      successCB(resp)
    }
  })
}

