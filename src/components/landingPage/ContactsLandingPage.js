import React, {Component} from 'react';
import { connect } from 'react-redux'
import GoogleAction from "../../actions/GoogleAction";
import VotersCheckbox from './VotersCheckbox'
import Google from './manageVoters/google/Google';
import '../../resources/App.scss'
import LoadingIndicator from '../LoadingIndicator'
import IdentityAction from "../../actions/IdentityAction";


class ContactsLandingPage extends Component {
	constructor() {
		super();
		this.state = {
			addVotersSelectedOption : 'google'
		}
	}

	componentDidMount(){
		//this.props.isSignedIn('/landingPage/ContactsLandingPage');
	 if (localStorage.getItem('loginSource') === 'btw') {
		 this.props.getBtwUserProfile();
	 }else {
		 this.props.getGoogleUserProfile();
	 }
	}

	render() {
		const {isInteractionComplete, isFetching } = this.props;
		return (
			<div className='btw-container left-align'>
				<br/>
				<br/>
				<br/>
				<br/>
				<ul className="collapsible btw-collapsible" data-collapsible="accordion">
					<li>
						<div className="collapsible-header"><i className="material-icons">filter_drama</i>Manage your voters <span className="new badge">1</span></div>
						<div className="collapsible-body">

							<span>Welcome, we noticed that you do not have any voters added to your network. How do you want to add voters to your network</span>
							<br/>
							<br/>
							{ !isInteractionComplete  && !isFetching && <VotersCheckbox /> }
						</div>
					</li>
					<li>
						<div className="collapsible-header"><i className="material-icons">place</i>Upcoming elections<span className="new badge">1</span></div>
						<div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
					</li>
					<li>
						<div className="collapsible-header"><i className="material-icons">whatshot</i>Social media <span className="new badge">1</span></div>
						<div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
					</li>
				</ul>
			</div>
		);
	}
}

const stateToProps = (state) => {
	const { isInteractionComplete, selectedFormValue, isGoogle } = state.form.submitVotersCheckBox;
	const { isFetching } = state.google.importGoogleContacts;
	return {
		isInteractionComplete,
		selectedFormValue,
		isGoogle,
		isFetching

	}
}

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: (page) => dispatch(GoogleAction.isSignedIn(page)),
	importGoogleContacts: () => dispatch(GoogleAction.importGoogleContacts()),
	getGoogleUserProfile: () => dispatch(GoogleAction.getGoogleUserProfile()),
	getBtwUserProfile: () => dispatch(IdentityAction.getBtwUserProfile())
})


export default connect(stateToProps, mapDispatchToProps) (ContactsLandingPage)