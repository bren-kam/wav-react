import GoogleConstants from '../constants/GoogleConstants';


import {combineReducers} from 'redux'

export function initGoogle(state = {}, action) {

	switch (action.type) {

		case GoogleConstants.GOOGLE_AUTH_PREPARE_REQUEST:
			return Object.assign({}, state, {
				isFetching     : true,
				isAuthenticated: false
			});

		case GoogleConstants.GOOGLE_AUTH_PREPARE_SUCCESS:
			return Object.assign({}, state, {
				isFetching     : false,
				isAuthenticated: true,
				response       : action.response
			});

		case GoogleConstants.GOOGLE_AUTH_PREPARE_FAILURE:
			return Object.assign({}, state, {
				isFetching     : false,
				isAuthenticated: false,
				errorMessage   : action.message
			});

		case GoogleConstants.GOOGLE_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching     : false,
				isAuthenticated: true,
				response       : action.response,
				source: action.source
			});

		case GoogleConstants.GOOGLE_LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching     : false,
				isAuthenticated: true,
				error       : action.error,
				source: action.source
			});

		default:
			return state

	}
}

export function googleLogOn(state = {}, action) {

	switch (action.type) {

		case GoogleConstants.GOOGLE_LOGIN_REQUEST:
			return Object.assign({}, state, {
				...state,
				user: action.identity
			});

		case GoogleConstants.GOOGLE_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				...state,
				errorMessage: ''
			});

		case GoogleConstants.GOOGLE_LOGIN_FAILURE:
			return Object.assign({}, state, {
				...state,
				errorMessage: action.message
			});

		default:
			return state

	}
}

export function importGoogleContacts(state = {}, action) {

	switch (action.type) {

		case GoogleConstants.GOOGLE_CONTACTS_REQUEST:
			return Object.assign({}, state, {});

		case GoogleConstants.GOOGLE_CONTACTS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				response: action.response.data
			});

		case GoogleConstants.GOOGLE_CONTACTS_FAILURE:
			return Object.assign({}, state, {
				...state,
				errorMessage: action.error
			});

		default:
			return state

	}
}


export function googleSignOut(state = {
	isAuthenticated  : localStorage.getItem('isAuthenticated'),
	loggedInFirstName: localStorage.getItem('firstname'),
	loggedInLastName : localStorage.getItem('lastname'),
	loggedInEmail    : localStorage.getItem('email')
}, action) {
	switch (action.type) {

		case GoogleConstants.GOOGLE_SIGNOUT_REQUEST:
			return Object.assign({}, state, {
				...state
			});

		case GoogleConstants.GOOGLE_ISSIGNEDIN_SUCCESS:
			return Object.assign({}, state, {
				response: action.response
			});

		case GoogleConstants.GOOGLE_ISSIGNEDIN_FAILURE:
			return Object.assign({}, state, {
				error: action.error
			});

		default:
			return state

	}
}

export function getGoogleUserProfile(state = {}, action){

	switch (action.type) {

		case GoogleConstants.GOOGLE_PROFILE_REQUEST:
			return Object.assign({}, state, {
				loggedInUsername: ''
			});

		case GoogleConstants.GOOGLE_PROFILE_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: action.isAuthenticated,
				username: action.response.currentUser.Ab.w3.ig,
				firstname: action.response.currentUser.Ab.w3.ofa,
				lastname: action.response.currentUser.Ab.w3.wea,
				email: action.response.currentUser.Ab.w3.U3,
				image: action.response.currentUser.Ab.w3.Paa,
				tokenInformation:{
					access_token: action.response.currentUser.Ab.Zi.access_token,
					expires_at: action.response.currentUser.Ab.Zi.expires_at,
					expires_in: action.response.currentUser.Ab.Zi.expires_in,
					id_token: action.response.currentUser.Ab.Zi.id_token
				}
			});

		case GoogleConstants.GOOGLE_PROFILE_FAILURE:
			return Object.assign({}, state, {
				error: action.error
			});

		default:
			return state

	}
}

const GoogleReducer = combineReducers({
	initGoogle,
	googleLogOn,
	importGoogleContacts,
	googleSignOut,
	getGoogleUserProfile
})

export default GoogleReducer