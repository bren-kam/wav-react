import React, {Component} from 'react';
import {connect} from 'react-redux'
import GoogleAction from '../actions/GoogleAction';
import {Link} from 'react-router-dom'
import IdentityAction from "../actions/IdentityAction";


const googleClientId = '454428759410-1qaqe6qbio6enh6m0dmvmabggrfumejg.apps.googleusercontent.com';
const facebookAppId = 'FACEBOOK_APP_ID';
const api_Key = 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			google         : {
				socialId         : googleClientId,
				apiKey           : api_Key,
				fetchBasicProfile: false,
				contacts         : '',
				accessInformation: ''
			},
			facebook       : {},
			isFetching     : false,
			isAuthenticated: false,
			btwIdentity    : {
				username: '',
				password: ''
			}
		}
	}


	updateLogonFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity [field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	btwSignOn() {
		this.props.btwSignOn(this.state.btwIdentity, 'btw');
	}

	componentDidMount() {
		//this.props.isSignedIn('login');
		this.props.initializeGoogle(this.state.google, 'google');
	}

	render() {
		const { isError } = this.props;

		return (
			<div className='container'>
				<br/>
				<br/>
				<br/>
				<br/>
				<div className="btw-login-container center">
					<div className="col s12 m7">
						<div className="">
							<div className="card-image">
								<span className="card-title"></span>
							</div>
							<div className="card-content">
								<p id="loginHeader">Log into your account</p>

								{ isError && <div> <h5 style={{color: 'red'}}>Check your username or password </h5></div>}
							</div>
							<div className="btw-container">

								<div className="input-field col s6">
									<label htmlFor="username">Username</label>
									<br/>
									<br/>
									<input id="username" type="state" className="btw-input-field" ref="username"
									       style={{color: 'black'}}
									       onChange={this.updateLogonFields.bind(this, 'username')}></input>
								</div>

								<div className="input-field col s6">
									<label htmlFor="password">Password</label>
									<br/>
									<br/>
									<input id="password" type="state" className="btw-input-field" ref="password"
									       style={{color: 'black'}}
									       onChange={this.updateLogonFields.bind(this, 'password')}></input>
								</div>

								<div className='btw-container'>
									<div id='loginbtn' className="btn-general btn"
									     onClick={this.btwSignOn.bind(this, 'btwSignOn')}>
										<span className='icon'></span>
										<span className="btw-buttonText">Login</span>
									</div>
									<h8>or</h8>
									<div id="googlebtn" className='btn-general btn'>
										<span className='icon'></span>
										<span className="btw-buttonText">Login with Google</span>
									</div>
								</div>
								<br/>
								<br/>
								<h8>Not registered? <Link to='/captainProfile/Register'>Register as a Captain</Link>
								</h8>
								<br/>
								<br/>
								<br/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { isFetching } = state.google.importGoogleContacts;
	const { isError } = state.identity.btwSignOn;
	return {
		isError
	}
}


const mapDispatchToProps = (dispatch) => ({
	initializeGoogle: (google, source) => dispatch(GoogleAction.initGoogle(google.socialId, google.fetchBasicProfile, source)),
	isSignedIn      : (page) => dispatch(GoogleAction.isSignedIn(page)),
	btwSignOn       : (btwIdentity, source) => dispatch(IdentityAction.btwSignOn(btwIdentity.username, btwIdentity.password, source))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);