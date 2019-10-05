const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');
const cors     = require('cors');
const path     = require('path');

const socket   = require('socket.io');
const http     = require('http');

 
const app = express();
const server = http.Server(app);
const io = socket(server);

// Mongo connect
mongoose.connect("mongodb+srv://omni:omni@cluster0-jiamz.mongodb.net/omnistack9?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next( );
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => {
    console.log("AIRCNC API OPEN PORT 3333");
});