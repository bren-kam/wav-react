import GoogleService from '../services/GoogleService'
import GoogleConstants from '../constants/GoogleConstants';
import axios from "axios/index";
import History from '../utility/History';


const GoogleAction = {
	importGoogleContacts,
	initGoogle,
	googleSignOut,
	getGoogleUserProfile
};


function initGoogle(socialId, fetchBasicProfile, source) {
	const submitButton = document.getElementById('googlebtn');
	const requestMessage = 'Initiating google request';
	return dispatch => {
		dispatch(request(requestMessage));
		((d, s, id, callback) => {
			let js, gs = d.getElementsByTagName(s)[0];
			js = d.createElement(s);
			js.id = id;
			js.src = '//apis.google.com/js/client:platform.js';
			gs.parentNode.insertBefore(js, gs);
			js.onload = callback;
		})(document, 'script', 'google-platform', () => {
			window.gapi.load('client:auth2', () => {
				if (!window.gapi.auth2.getAuthInstance()) {
					window.gapi.auth2.init({
						apiKey             : 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU',
						client_id          : socialId,
						fetch_basic_profile: fetchBasicProfile,
						scope              : 'openid profile email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/calendar',
						ux_mode            : 'redirect',
						display            : 'page',
						redirect_uri       : 'http://localhost:3000/landingPage/ContactsLandingPage',
						discoveryDocs      : 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
					}).then((authInstance) => {
						dispatch(success(authInstance));
						authInstance.attachClickHandler(submitButton, {},
							function (authInstance) {
								dispatch(googleLogOnSuccess(authInstance, source));
							}, function (error) {
								dispatch(googleLogOnFailure(error, source));
							});
						//}
					}, error => {
						dispatch(success(error));
					})
				} else {
					//automatically redirect to landing page
				}
			})
		})
	}

	function request(requestMessage) {
		return {
			type           : GoogleConstants.GOOGLE_AUTH_PREPARE_REQUEST,
			isFetching     : true,
			isAuthenticated: false,
			message: requestMessage
		}
	}

	function success(response) {
		return {
			type           : GoogleConstants.GOOGLE_AUTH_PREPARE_SUCCESS,
			isFetching     : false,
			isAuthenticated: response.isSignedIn.Ab,
			response       : response
		}
	}

	function failure(response) {
		return {
			type           : GoogleConstants.GOOGLE_AUTH_PREPARE_SUCCESS,
			isFetching     : false,
			isAuthenticated: response.isSignedIn.Ab,
			error          : response
		}
	}

	function googleLogOnSuccess(response, source) {
		return {
			type           : GoogleConstants.GOOGLE_LOGIN_SUCCESS,
			isFetching     : false,
			isAuthenticated: response.isSignedIn.Ab,
			response       : response,
			source         : source
		}
	}

	function googleLogOnFailure(response, source) {
		return {
			type           : GoogleConstants.GOOGLE_LOGIN_FAILURE,
			isFetching     : false,
			isAuthenticated: response.isSignedIn.Ab,
			error          : response,
			source         : source
		}
	}
}

function importGoogleContacts() {
	const requestMessage = ' Initiating google import';
	return dispatch => {
		((d, s, id, callback) => {
			let js, gs = d.getElementsByTagName(s)[0];
			js = d.createElement(s);
			js.id = id;
			js.src = '//apis.google.com/js/client:platform.js';
			gs.parentNode.insertBefore(js, gs);
			js.onload = callback;
		})(document, 'script', 'google-platform', () => {
			window.gapi.load('client:auth2', () => {
				window.gapi.auth2.init({
					apiKey       : 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU',
					clientId     : '454428759410-1qaqe6qbio6enh6m0dmvmabggrfumejg.apps.googleusercontent.com',
					discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
				}).then(authResponse => {
					dispatch(request(requestMessage))
					/*console.log(response.$K.Bp) //bearer
					console.log(response.$K.Q7.access_token)
					console.log(response.$K.Q7.id_token)
					localStorage.setItem('isAuthenticated', response.isSignedIn.Ab);
					localStorage.setItem('firstname', response.currentUser.Ab.w3.ofa);
					localStorage.setItem('lastname', response.currentUser.Ab.w3.wea);
					localStorage.setItem('email', response.currentUser.Ab.w3.U3);
					localStorage.setItem('photo', response.currentUser.Ab.w3.Paa);
					localStorage.setItem('access_token', response.$K.Q7.access_token);
					localStorage.setItem('id_token', response.$K.Q7.id_token);
					localStorage.setItem('expires_at', response.$K.Q7.expires_at);
					localStorage.setItem('expires_in', response.$K.Q7.expires_in);*/


					axios({
						method : 'GET',
						url    : 'https://people.googleapis.com/v1/people/me/connections',
						params : {
							personFields: 'names,photos,phoneNumbers',
							pageSize    : 97,
							key         : 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU'
						},
						headers: {
							'Authorization': "Bearer " + authResponse.$K.Q7.access_token,
							"Content-Type" : "application/json",
						}
					}).then(
						response => {
							dispatch(success(response))
						},
						error => {
							dispatch(failure(error))
						})
				})
			})
		})
	}

	function request(responseMessage) {
		return {
			type      : GoogleConstants.GOOGLE_CONTACTS_REQUEST,
			isFetching: true,
			request: responseMessage
		}
	}

	function success(response) {
		return {
			type      : GoogleConstants.GOOGLE_CONTACTS_SUCCESS,
			isFetching: false,
			response  : response
		}
	}

	function failure(error) {
		return {
			type      : GoogleConstants.GOOGLE_CONTACTS_FAILURE,
			isFetching: false,
			error     : error
		}
	}
}

function googleSignOut() {
	return dispatch => {
		try {
			dispatch(request());
			if (window.gapi.auth2.getAuthInstance()) {
				console.log('user is signed in')
				window.gapi.auth2.getAuthInstance().then(
					(authInstance) => {
						authInstance.signOut().then(
							(response) => {
								dispatch(success(response));
								console.log('User signed out.');
								localStorage.removeItem('isAuthenticated');
								localStorage.removeItem('firstname');
								localStorage.removeItem('lastname');
								localStorage.removeItem('email');
								localStorage.removeItem('photo');
								localStorage.removeItem('access_token');
								localStorage.removeItem('id_token');
								localStorage.removeItem('expires_at');
								localStorage.removeItem('expires_in');
								History.push({pathname: '/'})
							});
					}
				)
			}
		}
		catch (error) {
			dispatch(failure(error))
		}
	}

	function request() {
		return {
			type           : GoogleConstants.GOOGLE_SIGNOUT_REQUEST,
			isFetching     : true
		}
	}

	function success(response) {
		return {
			type           : GoogleConstants.GOOGLE_SIGNOUT_SUCCESS,
			isFetching     : false,
			isAuthenticated: false,
			response
		}
	}

	function failure(response) {
		return {
			type           : GoogleConstants.GOOGLE_SIGNOUT_FAILURE,
			isFetching     : false,
			isAuthenticated: false,
			response
		}
	}
}

function getGoogleUserProfile() {
	return dispatch => {
		try {
			dispatch(request());
			((d, s, id, callback) => {
				let js, gs = d.getElementsByTagName(s)[0];
				js = d.createElement(s);
				js.id = id;
				js.src = '//apis.google.com/js/client:platform.js';
				gs.parentNode.insertBefore(js, gs);
				js.onload = callback;
			})(document, 'script', 'google-platform', () => {
				window.gapi.load('client:auth2', () => {
					window.gapi.auth2.init({
						apiKey       : 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU',
						clientId     : '454428759410-1qaqe6qbio6enh6m0dmvmabggrfumejg.apps.googleusercontent.com',
						discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
					}).then(authResponse => {
						localStorage.setItem('isAuthenticated', authResponse.isSignedIn.Ab);
						localStorage.setItem('firstname', authResponse.currentUser.Ab.w3.ofa);
						localStorage.setItem('lastname', authResponse.currentUser.Ab.w3.wea);
						localStorage.setItem('email', authResponse.currentUser.Ab.w3.U3);
						localStorage.setItem('photo', authResponse.currentUser.Ab.w3.Paa);
						localStorage.setItem('access_token', authResponse.$K.Q7.access_token);
						localStorage.setItem('id_token', authResponse.$K.Q7.id_token);
						localStorage.setItem('expires_at', authResponse.$K.Q7.expires_at);
						localStorage.setItem('expires_in', authResponse.$K.Q7.expires_in);
						dispatch(success(authResponse));
					})
				})
			})
		} catch (error) {
			dispatch(failure(error))
		}
	}

	function request() {
		return {
			type      : GoogleConstants.GOOGLE_PROFILE_REQUEST,
			isFetching: true
		}
	}

	function success(response) {
		return {
			type           : GoogleConstants.GOOGLE_PROFILE_SUCCESS,
			isFetching     : false,
			isAuthenticated: true,
			response
		}
	}

	function failure(error) {
		return {
			type      : GoogleConstants.GOOGLE_PROFILE_FAILURE,
			isFetching: false,
			error
		}
	}
}


export default GoogleAction
