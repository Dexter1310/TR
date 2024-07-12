// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socketio-mongo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});



// Start the server , connection to BBDD
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// //TODO: add table Message Define a Mongoose schema and model
const messageSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit all messages when a user connects
    Message.find().then(messages => {
        socket.emit('initialMessages', messages);
    });

    // Handle incoming messages
    socket.on('newMessage', (msg) => {
        const message = new Message({ text: msg });
        message.save().then(() => {
            io.emit('message', message);
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});





