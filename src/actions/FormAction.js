
import FormConstants from '../constants/FormConstants';


const FormAction = {
	submitVotersCheckBox
};


function submitVotersCheckBox(selectedValue) {
	let isGoogle = false;
	let isFacebook = false;
	let isManual = false;

	return dispatch => {
		dispatch(request(selectedValue));
		if (selectedValue === 'google' || selectedValue === 'facebook'|| selectedValue === 'manually'){
			if (selectedValue === 'google') {
				isGoogle = true;
				dispatch(success(selectedValue, isGoogle))
			} else if (selectedValue === 'facebook') {
				isFacebook = true;
				dispatch(success(selectedValue, isFacebook))
			} else if (selectedValue === 'manually') {
				isManual = true;
				dispatch(success(selectedValue, isManual))
			}
		} else {
			dispatch(failure(selectedValue))
		}

	}

	function request() {
		return {
			type           : FormConstants.SELECTED_OPTION_REQUEST,
			isInteractionComplete:false
		}
	}

	function success(selectedValue, displayOption) {
		return {
			type: FormConstants.SELECTED_OPTION_SUCCESS,
			isInteractionComplete: true,
			selectedValue,
			displayOption
		}
	}

	function failure() {
		return {
			type: FormConstants.SELECTED_OPTION_FAILED,
			isInteractionComplete: false
		}
	}

}


export default FormAction
