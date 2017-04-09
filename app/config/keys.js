var baseURL = 'http://nodecompanyapi.herokuapp.com'

if (!process.env.PORT) {	
	baseURL = 'http://localhost:1447'
}

export default baseURL

