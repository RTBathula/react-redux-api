var baseURL = 'http://localhost:1447'

if (process.env.APIURL) {	
	baseURL = process.env.APIURL
}

export default baseURL

