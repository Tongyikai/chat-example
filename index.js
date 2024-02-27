const { Socket } = require('dgram');
const express = require('express'); 
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

var clients = 0;

io.on('connection', (socket) => {
    // socket.broadcast.emit('Hi welcome cyber world.');
    console.log('a user connected');
    clients++;
    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    

    socket.on('disconnect', () => {
        console.log('user disconnected');
        clients--;
        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg );
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
