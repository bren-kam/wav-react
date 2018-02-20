import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Google from './landingPage/manageVoters/google/Google';
import Facebook from './landingPage/manageVoters/facebook/Facebook';
import ContactsLandingPage from './landingPage/ContactsLandingPage';
import History from '../utility/History';
import VotersListDashboard from './landingPage/votersList/VotersListDashboard';
import ManualVotersDashboard from './landingPage/manageVoters/manual/ManualVotersDashboard';
import ValidateVoter from './landingPage/ValidateVoter';
import Register from './captainProfile/Register';
import Page_50_X from './errorPages/Page_50_X';




const Router =() => (
	<router history={ History }>
		<Switch>
			<Route exact path ='/' component = {Login}/>
			<Route exact path ='/landingPage/manageVoters/google/Google' component = {Google}/>
			<Route exact path ='/landingPage/ContactsLandingPage' component = {ContactsLandingPage}/>
			<Route exact path ='/landingPage/votersList/VotersListDashboard' component = {VotersListDashboard}/>
			<Route exact path ='/landingPage/votersList/ValidateVoter/:id' component = {ValidateVoter}/>

			<Route exact path ='/captainProfile/Register' component = {Register}/>
			<Route exact path ='/landingPage/manageVoters/manual/ManualVotersDashboard' component = {ManualVotersDashboard}/>
			<Route exact path ='/facebook/Facebook' component = {Facebook}/>

			<Route exact path ='/errorPages/Page_50_X' component = {Page_50_X}/>
		</Switch>
	</router>
)
export default Router;