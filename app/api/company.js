import baseURL from 'config/keys'
import request from 'superagent'
import * as util from 'helpers/util'

export const getList = (successCB,errorCB) => {	 
  return request
  .get(baseURL+'/company')     
  .end(function(err, reply){     
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}

export const createNewCompany = (companyObj,successCB,errorCB) => {  
  return request
  .post(baseURL+'/company') 
  .send(JSON.stringify(companyObj))  
  .end(function(err, reply){     
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}
