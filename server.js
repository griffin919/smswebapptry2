const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const socketio = require('socket.io');
const Nexmo = require('nexmo');



const userDataControl = require('./controllers/userDataControl');

//init express
const app = express();

//fire controllers
userDataControl(app);

//init nexmo
const nexmo = new Nexmo({
    apiKey: 'd991c8c0',
    apiSecret: 'ijvBUvOEc3Z5pbhb',

  },{debug: true});

//global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static assets with 
app.use(express.static(__dirname + '/assets'));

//view engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//-----------------------------------------------------------




//-------------------------------------------------------------

//listening port
const port = 3000;
const server = app.listen(port, () => console.log('Tuned into port ' + port));

//Connecting to socket.io
const io = socketio(server);
io.on('connection', (socket)=>{
    console.log('Server connected');
    io.on('disconnect', (socket)=>{
        console.log('Disconnected');
        
    })
    
})
