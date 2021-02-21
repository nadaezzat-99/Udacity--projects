// Setup empty JS object to act as endpoint for all routes
  let  projectData = {};


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, runServer);

function runServer() {
    console.log('server is running...');
    console.log(`running on server: ${port}`);
 }
// Initialize all routes with a callback function
app.get('/addData', getData);
app.post('/allData', postData);

// Callback function to complete GET '/addData'

function getData(req, res){
    res.send(projectData);
 }

//  function to complete Post '/allData'
function postData(req, res) {
   // console.log(req.body);
  let  newEntery = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response,
    }
    projectData=newEntery;
    res.send(projectData);
}
