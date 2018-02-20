import React, {Component} from 'react';
import '../../resources/App.scss'
import History from '../../utility/History';

class Page_50_X extends Component {


	sendBackToHomePage() {
		History.replace('/')
		History.go();
	}

	render() {
		let error = localStorage.getItem('lastError');
		return (
			<div className='btw-container'>
				<br/>
				<br/>
				<br/>
				<p1 id="loginHeader"> Sorry ....Something went wrong because { error } .... Please try again later</p1>
				<br/>
				<br/>
				<br/>
				<button onClick={this.sendBackToHomePage.bind(this, 'backToHomePage')}
				        className='btn-general-go-back'>Go back home
				</button>
			</div>
		);
	}
}

export default Page_50_X;