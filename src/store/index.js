import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { GoogleReducer, FacebookReducer, IdentityReducer } from '../reducers';



let store;



export default {


	// component = > action = > reducer > store >
	configure: (initialState) => {

		//the store is a combination of reducers
		//this is where you insert your reducers into the store
		const combinedReducers = combineReducers({
			google: GoogleReducer,
			facebook: FacebookReducer,
			identity: IdentityReducer
		});


		if (initialState){
			store = createStore(combinedReducers, initialState, applyMiddleware(thunk));
			return store
		}
		store  = createStore(combinedReducers, applyMiddleware(thunk, logger));
		return  store
	}
}
