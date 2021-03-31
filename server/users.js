// helper functions to manage users

// list of current existing users
let users = [];

// add new user to server
const addUser = ({ id, name, room }) => {
	// convert name and room string to a parsable form
	name = name.trim();
	room = room.trim();

	// if any user the room with the same name then append a number after name
	let userIndex = 1;
	while (users.find((user) => user.name === name && user.room === room)) {
		name = name + `${userIndex}`;
	}

	// insert new user to user list
	const user = { id, name, room };
	users.push(user);

	return { user: user };
}

// remove user from server
const removeUser = (id) => {
	// find index of user with id in user list
	const index = users.findIndex((user) => user.id === id);
	// if user found then remove user from list
  	if(index !== -1) return users.splice(index, 1)[0];
}

// get user by id
const getUser = (id) => users.find((user) => user.id === id);

// get all users in room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };