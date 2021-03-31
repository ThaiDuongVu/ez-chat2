import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
	let sentByCurrentUser = false;
	const userName = name.trim();

	if (user === userName) sentByCurrentUser = true;

	if (sentByCurrentUser) {
		return (
			<div className="messageContainer justifyEnd">
				<p className="sentText">{user}</p>
				<div className="messageBox backgroundBlue">
					<p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
				</div>
			</div>
		);
	}
	else {
		return (
			<div className="messageContainer justifyStart">
				<div className="messageBox backgroundLight">
					<p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
				</div>
				<p className="sentText pl-10">{user}</p>
			</div>
		);
	}
}

export default Message;