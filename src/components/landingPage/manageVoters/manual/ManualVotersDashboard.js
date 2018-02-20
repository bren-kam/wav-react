import VoterAddForm from './VoterAddForm'
import VerifiedVotersList from '../../votersList/segments/VerifiedVotersList'

import React, {Component} from 'react';
import History from "../../../../utility/History";


class ManualVotersDashboard extends Component {

	navigateBackToPreviousPage(field, event){
		History.replace('/landingPage/ContactsLandingPage');
		History.go()
	}

	render() {
		return (
			<div className='btw-container'>

				<div className='btw-container'>
					<button className='btn-general-go-back' onClick={this.navigateBackToPreviousPage.bind(this, 'goBack')}>Go back</button>
				</div>
				<div className="verticalLine-left">


					<hr/>
					<div id="votersVerticalInner" className="verticalLine-left">
						<div id="" className="verticalLine-right">
							<hr/>
							<div className="row">
								<VoterAddForm/>
							</div>
							<hr/>
						</div>
					</div>
					<hr/>

					<hr/>
					<div id="votersVerticalInner" className="verticalLine-left">
						<hr/>
						<div className="row">
							<VerifiedVotersList/>
						</div>
						<hr/>
					</div>


				</div>
			</div>
		);
	}
}

export default ManualVotersDashboard;