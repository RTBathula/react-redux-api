var baseURL = 'http://todovabackend.herokuapp.com'

if (process.env.NODE_ENV !== 'production') {	
	baseURL = 'http://localhost:3000'
}

export default baseURL

