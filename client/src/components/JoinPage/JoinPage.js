import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './JoinPage.css';

const JoinPage = () => {
  // user name
  const [name, setName] = useState('');
  // room to join
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">EZ Chat</h1>

        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => {
          setName(event.target.value)
        }} /></div>

        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => {
          setRoom(event.target.value)
        }} /></div>

        <Link onClick={(event) => {
          if (!name || !room) {
            alert('Please input your name and room ID first')
            event.preventDefault();
          }
        }} to={`\chat?name=${name}?room=${room}`}>
          <button className="joinButton mt-20" type="submit">Join Chat</button>
        </Link>

      </div>
    </div>
  )
}

export default JoinPage;