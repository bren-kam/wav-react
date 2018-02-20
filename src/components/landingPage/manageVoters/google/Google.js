import React, { Component } from 'react';
import {connect} from 'react-redux'
import GoogleAction from '../../../../actions/GoogleAction';


class Google extends Component {

	handleGoogleOnClick() {
		const { authResponse } = this.props;
		this.props.importGoogleContacts(authResponse);
	}


	render () {
		return (
			<div className='container'>
				<div>
					<button onClick={this.handleGoogleOnClick.bind(this, 'importGoogle')} className='btn-large'>Import your Google contacts</button>
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	 const { authResponse }=  state.google.initGoogle;
	return{
		authResponse
	}
}


const mapDispatchToProps = (dispatch) => ({
	importGoogleContacts: (authResponse) => dispatch(GoogleAction.importGoogleContacts(authResponse))
})


export default connect (mapStateToProps, mapDispatchToProps) (Google);