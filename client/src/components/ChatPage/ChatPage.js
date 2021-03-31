import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './ChatPage.css'

let socket;
const ENDPOINT = 'https://ez-chat2.herokuapp.com/';

const ChatPage = ({ location }) => {
	// user name
	const [name, setName] = useState('');
	// room to join
	const [room, setRoom] = useState('');

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const [usersInRoom, setUsersInRoom] = useState([]);

	useEffect(() => {
		// user data parsed from url
		const { name, room } = queryString.parse(location.search.replaceAll('?', '&'));
		// init socket
		socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

		// set user name and room from url
		setName(name);
		setRoom(room);

		// emit a join message to notify server
		socket.emit('join', { name, room }, () => {

		});

		// on user disconnected
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		// on user receive a message
		socket.on('receiveMessage', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	useEffect(() => {
		// on other users enter/leave room
		socket.on('roomData', ({room, users}) => {
			setUsersInRoom(users);
		})
	}, [usersInRoom]);
	
	// send a message to room
	const sendMessage = (event) => {
		event.preventDefault();
		if (message.length <= 0) return;
		
		socket.emit('sendMessage', message, () => setMessage(''))
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar roomName={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
}

export default ChatPage;