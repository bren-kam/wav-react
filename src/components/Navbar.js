import React, {Component} from 'react';
import {connect} from 'react-redux'
import GoogleAction from "../actions/GoogleAction";
import HeaderDropdown from "./HeaderDropdown"


class Navbar extends Component {

	constructor() {
		super();
		this.state = {
			isAuthenticated : false,
			loggedInUsername: ''
		}
	}

	componentDidMount(){

	}


	render() {
		const { username, isAuthenticated, response } = this.props;
		console.log(response);
		let id = Math.floor((Math.random() * 100000000) + 1);
		return (
			<div>
				<nav className="header-nav-bar">
					<div className="nav-wrapper">
						<a href="/" className="brand-logo center">Be the wave</a>
						<a data-activates="main-menu" className="button-collapse show-on-large"></a>
						<ul className="right hide-on-small-only">

							{ isAuthenticated && <li><HeaderDropdown key={id} id={id} displayName={username}/></li> }
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { response } = state.identity.getBtwUserProfile;

	return {
		response
	}
}

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: (component) => dispatch(GoogleAction.isSignedIn(component))
	//add facebook and btw signOut
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);