# React-Redux company dashboard 
Clearhaus test project. A company web dashboard for the company API(https://github.com/RTBathula/nodeapp).

# Hosted URL
http://nodecompanyweb.herokuapp.com
The hosted Dashboard is pointing to http://nodecompanyapi.herokuapp.com for company API.


# Trivia
Used ES6,Reactjs and Reduxjs for this project. Using Reduxjs, avoided mutable updates to the data. Also made a good UI design on connecting to company api.
Throughout the project, errors are respected(i.e properly showing) and showing spinners wherever is necessary.


# Getting Started

Fork and clone the repository. Install dependencies with:

``npm install``

# Company API Url connection
Configure company API Url in app/config/keys.js file

Example: under app/config/keys.js
```
var baseURL = 'http://localhost:1447'
```

Alternatively you can set by environment variable by
```
export APIURL = 'http://localhost:1447'
```

# Run Server
After completing all above steps run your node.js server
```
npm start
```

# Can I deploy docker image in heroku?
Yes, As dockerfile is written for this project, you can deploy to heroku using simple heroku commands. Here is how.

##Direct image push to heroku from project workspace(main commands)
```
heroku create
heroku container:push web
heroku config:set APIURL=http://localhost:1447
```
##Using existing docker image from (rtbathula/reactreduxweb)
```
docker tag rtbathula/reactreduxweb registry.heroku.com/<heroku-app-name>/web
docker push registry.heroku.com/<heroku-app-name>/web
heroku config:set APIURL=http://localhost:1447
```
For more info, look here https://devcenter.heroku.com/articles/container-registry-and-runtime

NOTE: If you're using docker in locally , you should set APIURL in docker run command, otherwise http://localhost:1447 take as default APIURL
```
docker run -d -e APIURL=http://nodecompanyweb.herokuapp.com -p 8080:1446 rtbathula/reactreduxweb
```

## Love :heart: to hear feedback from you
RT Bathula-weirdo,coffee lover
battu.network@gmail.com

