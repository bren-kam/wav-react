import FormConstants from "../constants/FormConstants";
import { combineReducers } from "redux";

export function submitVotersCheckBox(state = {
	selectedFormValue: '',
	isInteractionComplete: false,
	isGoogle: false,
	isFacebook: false,
	isManual: false
}, action) {

	switch (action.type) {

		case FormConstants.SELECTED_OPTION_REQUEST:
			return Object.assign({}, state, {
				isInteractionComplete: false
			});

		case FormConstants.SELECTED_OPTION_SUCCESS:
			return Object.assign({}, state, {
				isInteractionComplete: true,
				selectedFormValue: action.selectedValue,
				isGoogle: true,
				isFacebook: false,
				isManual: false
			});

		case FormConstants.SELECTED_OPTION_FAILED:
			return Object.assign({}, state, {
				isInteractionComplete: false
			});

		default:
			return state
	}
}

const FormReducer = combineReducers({
	submitVotersCheckBox
})


export default FormReducer