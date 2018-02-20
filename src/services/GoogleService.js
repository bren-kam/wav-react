
import axios from 'axios';


const GoogleService = {
	getGoogleContacts
};


function getGoogleContacts (authResponse) {
	return axios({
		method : 'GET',
		url    : 'https://people.googleapis.com/v1/people/me/connections',
		params : {
			personFields: 'names,photos,phoneNumbers,interests',
			pageSize    : 100,
			key         : 'AIzaSyBsua9pgObTgPvxS5kXTeC5opTEK4L6GHU'
		},
		headers: {
			'Authorization': "Bearer " + authResponse.$K.Q7.access_token,
			"Content-Type" : "application/json",
		}
	}).then(
		response => {
			//console.log('contacts response ' + response)
			if (!response.data.token){
				return Promise.reject(response.data.status);
			}
			return response.data;
		}
	)
}

export default GoogleService