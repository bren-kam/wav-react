import React, {Component} from 'react';
import {connect} from 'react-redux'
import FormAction from '../../actions/FormAction'
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import { Link } from 'react-router-dom'


class VotersCheckbox extends Component {

	constructor() {
		super();
		this.state = {
			selectedValue        : '',
			isInteractionComplete: false,
			isGoogle: false,
			isFacebook: false,
			isManual: false
		}
	}

	onChange(event){
		this.setState({
			selectedValue        : event,
			isInteractionComplete: false
		})
		if (event ==='manually'){
			//do nothing
		}else {
			this.props.submitVotersCheckBox(this.state)
		}
	}

	render() {

		return (
			<div className='btw-container'>
				<RadioGroup onChange={this.onChange.bind(this)} >
					<RadioButton value="google" pointColor="green">
						<Link to="/landingPage/votersList/VotersListDashboard">Import from Google</Link>
					</RadioButton>
					<RadioButton value="facebook" pointColor="green">
						Import from Facebook
					</RadioButton>
					<RadioButton value="manually" pointColor="green">
						<Link to="/landingPage/manageVoters/manual/ManualVotersDashboard">Enter my voters manually</Link>
					</RadioButton>
				</RadioGroup>
			</div>
		);
	}
}

const stateToProps = (state) => {
	const { isInteractionComplete } = state.form.submitVotersCheckBox;
	return {
		isInteractionComplete
	}
}

const dispatchToProps = (dispatch) => {
	return {
		submitVotersCheckBox: (state) => { dispatch(FormAction.submitVotersCheckBox(state.selectedValue))}
	}
}

export default connect (stateToProps, dispatchToProps) (VotersCheckbox);