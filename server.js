
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

//get data
app.get('/return', getData);
function getData(request, response) {
  response.send(projectData);
}

// Post data
app.post('/add', postData);
function postData(request, response) {
    projectData = request.body;
    response.send({ message: 'Post received' });
    console.log(projectData);
}
