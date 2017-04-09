import baseURL from 'config/keys'
import request from 'superagent'
import * as util from 'helpers/util'

export const getList = (skip,limit,successCB,errorCB) => {	 
  console.log(process.env.PORT)
  console.log(baseURL)
  return request
  .get(baseURL+'/company?skip='+skip+'&limit='+limit)     
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
  .send(companyObj)
  .end(function(err, reply){       
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}

export const fetchCompanyDetails = (companyId,successCB,errorCB) => {  
  return request
  .get(baseURL+'/company/'+companyId)  
  .end(function(err, reply){       
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}

export const updateCompanyDetails = (companyId,updateObj,successCB,errorCB) => {   
  return request
  .put(baseURL+'/company/'+companyId+'/update-company') 
  .send(updateObj)
  .end(function(err, reply){       
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}

export const addBeneficial= (companyId,beneficialObj,successCB,errorCB) => {   
  return request
  .put(baseURL+'/company/'+companyId+'/add-beneficial') 
  .send(beneficialObj)
  .end(function(err, reply){       
    var resp=JSON.parse(reply.text)              
    if (err || !reply.ok) {
      errorCB(resp.message)
    } else {    
      successCB(resp.data)
    }
  })
}