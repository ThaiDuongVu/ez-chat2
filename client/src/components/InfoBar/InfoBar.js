import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ roomName }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img className="onlineIcon" src={onlineIcon} alt="User is online" />
				<h3>{roomName}</h3>
			</div>

			<div className="rightInnerContainer">
				<a href="/">
					<img src={closeIcon} alt="Exit chat" />
				</a>
			</div>
		</div>
	)
}

export default InfoBar;