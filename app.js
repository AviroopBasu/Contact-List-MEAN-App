//Importing modules

const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path'); // Core module
const route = require('./routes/route');

var app = express();
var port = 3000;

//Adding MW
app.use(cors());
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

//On connection
mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Error in connection : '+ err);
});

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Creating Routes
app.use('/api', route);

app.listen(port, ()=> {
    console.log("Server connected at port: "+port);
});
