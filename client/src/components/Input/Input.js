import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
	return (
		<form className="form" action="">
			<input
				className="input"
				type="text"
				placeholder="Enter your message here"
				value={message}
				onChange={(event) => {
					setMessage(event.target.value);
				}}
				onKeyPress={(event) => {
					if (event.key === 'Enter') sendMessage(event);
				}}
			/>

			<button className="sendButton" onClick={(event) => { sendMessage(event) }}>Send</button>
		</form>
	);
}

export default Input;