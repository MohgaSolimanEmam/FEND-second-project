// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
  // response.send('Green') // If we want to make a mini test framekwork in here
  response.send(projectData);
};

app.post('/add', (request,response)=>{
  // console.log(request.body)
  let data = request.body;
  console.log(data.temp);

  // Create new entry for JS Object Endpoint
  projectData["temp"] = data.temp;
  projectData["feel"] = data.feeling;
  projectData["date"] = data.date;

  // Send response to Endpoint
  response.send(projectData);
})