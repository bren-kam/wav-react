import React, {Component} from 'react';
import '../../../../resources/App.css';
import {connect} from 'react-redux'
import IdentityAction from "../../../../actions/IdentityAction";
import Voter from '../../Voter'


class UnverifiedVotersList extends Component {


	componentDidMount() {
		this.props.isSignedIn();
	}


	render() {
		const {response} = this.props;
		let { voters } = {};
		if (typeof response === 'undefined'){
			//do nothing
		} else {
			 voters = response.connections.map((connection) => {
				return (
					<Voter key={connection.photos[0].metadata.source.id}
					       id={connection.photos[0].metadata.source.id}
					       vo={connection}/>
				)
			})
		}

		return (
			<div className='btw-container'>
				<ul className="collection">
					{voters}
				</ul>
			</div>
		);
	}
}

const stateToProps = (state) => {
	const {isFetching, response} = state.google.importGoogleContacts;
	return {
		isFetching,
		response
	}
}

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: (page) => dispatch(IdentityAction.isSignedIn(page))
})

export default connect(stateToProps, mapDispatchToProps)(UnverifiedVotersList);