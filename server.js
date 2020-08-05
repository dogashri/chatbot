const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const App = express()
const server = http.createServer(App);
const io = socketio(server)

// set static folder
App.use(express.static(path.join(__dirname,'public')))

// run when client connects
io.on('connection', socket => {

    //welcome current user 
    socket.emit('message','Welcome to chatcord')

    // broadcast when a user connects
    socket.broadcast.emit('message','A new user is connected');

    // runs when client disconnects
    socket.on('disconnect',()=>{
      io.emit('message','A user has left the chat')
    })
  });

  

const PORT = 3000 || process.env.PORT

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))