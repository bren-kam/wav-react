import React, { Component } from 'react';
import '../resources/App.css';

import Navbar from './Navbar';
import Footer from './Footer';
import Router from './Router';






class App extends Component {


	render() {
		return (
			<div className="App">
				<Navbar />
				<Router />
				<Footer />
			</div>
		);
	}
}



export default App;