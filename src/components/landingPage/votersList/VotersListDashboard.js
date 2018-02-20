import React, {Component} from 'react';
import '../../../resources/App.css';
import UnverifiedVotersList from './segments/UnverifiedVotersList'
import VerifiedVotersList from './segments/VerifiedVotersList'
import { connect } from 'react-redux';
import IdentityAction from "../../../actions/IdentityAction";
import Google from '../manageVoters/google/Google'
import LoadingIndicator from '../../LoadingIndicator'


class VotersListDashboard extends Component {


	componentDidMount(){
		this.props.isSignedIn('/landingPage/votersList/VotersListDashboard');
	}


	render() {

		const {isFetching } = this.props;
		return (
			<div id="" className='btw-container'>
				<div className="verticalLine-left">


					<hr/>
					<div>
						{ !isFetching && <Google /> }
					</div>
					<hr/>
					<div id="votersVerticalInner" className="verticalLine-left">
						<div className="row">
							{!isFetching && <UnverifiedVotersList/> }
							{ isFetching && <LoadingIndicator />}
						</div>
					</div>

					<hr/>

					<div id="votersVerticalInner" className="verticalLine-left">
						<div className="row">
							{!isFetching && <VerifiedVotersList/> }

						</div>
					</div>
					<hr/>
				</div>
			</div>
		);
	}
}


const stateToProps = (state) => {
	const { isFetching } = state.google.importGoogleContacts;
	return {
		isFetching
	}
}

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: () => dispatch(IdentityAction.isSignedIn())
})


export default connect (stateToProps, mapDispatchToProps) (VotersListDashboard);