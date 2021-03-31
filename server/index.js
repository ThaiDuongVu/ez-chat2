// import modules
const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const cors = require('cors');

// port for server to listen to
const PORT = process.env.PORT || 5000;

// create basic app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// import and use router from router.js
const router = require('./router')
app.use(router);

app.use(cors());

// import users helper functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// on user connected
io.on('connect', (socket) => {
	// on user join chat room
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name: name, room: room });

		// handle any error from adding new user
		if (error) return callback(error);

		// send message to new user
		socket.emit('receiveMessage', { user: 'ez-chat', text: `Hello ${user.name}, welcome to ${user.room}` });
		// send message to all existing users
		socket.broadcast.to(user.room).emit('receiveMessage', { user: 'ez-chat', text: `${user.name} has joined the party` });

		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		// join socket to room
		socket.join(user.room);

		callback();
	})

	// on user send message
	socket.on('sendMessage', (message, callback) => {
		// get user who sent the message
		const user = getUser(socket.id);

		// handle error when user is not found
		if (!user) return;

		// emit message to users
		io.to(user.room).emit('receiveMessage', { user: user.name, text: message });
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	// on user disconnected
	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		io.to(user.room).emit('receiveMessage', { user: 'ez-chat', text: `${user.name} has left the room` });
	})
});

server.listen(PORT, (request, response) => {
	console.log(`Server started on port ${PORT}`);
})