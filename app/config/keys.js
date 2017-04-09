var baseURL = 'http://nodecompanyapi.herokuapp.com'

if (process.env.NODE_ENV !== 'production') {	
	baseURL = 'http://localhost:1447'
}

export default baseURL

