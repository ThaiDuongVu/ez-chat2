import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import JoinPage from './components/JoinPage/JoinPage'
import ChatPage from './components/ChatPage/ChatPage'

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={JoinPage} />
			<Route path="/chat" exact component={ChatPage} />
		</BrowserRouter>
	)
}

export default App;