import React, {Component} from 'react';
import {connect} from 'react-redux'
import IdentityAction from "../../actions/IdentityAction";


class Register extends Component {


	constructor() {
		super();
		this.state = {
			btwIdentity:{
				firstname      : '',
				lastname       : '',
				username       : '',
				password       : '',
				confirmPassword: '',
				email          : ''
			}
		}
	}

	updateRegisterFields(field, event) {
		let identity = Object.assign({}, this.state.btwIdentity);
		identity [field] = event.target.value;
		this.setState({
			btwIdentity: identity
		})
	}

	btwRegister(event) {
		this.props.btwRegister(this.state.btwIdentity)
	}

	render() {
		return (
			<div className='btw-container '>

				<p className="btw-registerHeading">Register as a captain</p>

				<div className="">
					<div className="input-field col s6">
						<input id="firstname" type="" className="btw-input-field" ref="firstname"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'firstname')}></input>
						<label htmlFor="username">First Name <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="lastname" type="" className="btw-input-field" ref="lastname"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'lastname')}></input>
						<label htmlFor="lastname">Last Name <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="username" type="" className="btw-input-field" ref="username"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'username')}></input>
						<label htmlFor="username">Username <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="password" type="" className="btw-input-field" ref="password"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'password')}
						       autoComplete="off"></input>
						<label htmlFor="password">Password <span style={{color: 'red'}}>*</span></label>
					</div>
					<div className="input-field col s6">
						<input id="confirmPassword" type="" className="btw-input-field" ref="confirmPassword"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'confirmPassword')}
						       autoComplete="off"></input>
						<label htmlFor="confirmPassword">Confirm Password <span style={{color: 'red'}}>*</span></label>
					</div>

					<div className="input-field col s6">
						<input id="email" type="" className="btw-input-field" ref="email"
						       style={{color: 'black'}} required="" aria-required="true"
						       onChange={this.updateRegisterFields.bind(this, 'email')}></input>
						<label htmlFor="email">Email Address <span style={{color: 'red'}}>*</span> </label>
					</div>

					<span style={{color: 'red'}}>*</span><p>Denotes required fields</p>

					<div className='btw-container'>
						<div id='registerSubmitButton' className="btn-general btn"
						     onClick={this.btwRegister.bind(this, 'btwSignOn')}>
							<span className="btw-buttonText">Register</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
}


const mapDispatchToProps = (dispatch) => ({
	btwRegister: (btwIdentity) => dispatch(IdentityAction.btwRegister(btwIdentity))
})

export default connect(null, mapDispatchToProps)(Register);