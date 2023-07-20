const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);




// set up routes and middleware
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web.html');
});

// listen for incoming connections from clients
io.on('connection', (socket) => {
    console.log('a user connected');
    // handle incoming messages from clients
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        // broadcast the message to all clients
        io.emit('message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
