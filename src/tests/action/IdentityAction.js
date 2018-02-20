import IdentityAction from "../../actions/IdentityAction";
import IdentityConstants from "../../constants/IdentityConstants";
import expect from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import IdentityService from '../../services/IdentityService';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('getBtwUserProfile tests', () => {
	const token = 'fsdjbsjdkabfjdskbfkdshfgjdfksgndfkjgndfkgndfkngkfd';
	const response = {
		"status"         : 200,
		"message"        : "User information successfully retrieved",
		"userInformation": {
			"username"   : "testing",
			"email"      : "testUser@test.com",
			"firstname"  : "john",
			"lastname"   : "test",
			"role"       : "captain",
			"dateofbirth": "2000-01-22T03:39:04.459Z",
			"address"    : "1550 Acme street",
			"phonenumber": "7765564732"
		}
	}
	it('it should dispatch a success', () => {
		let mockAdapter = new MockAdapter(axios);
		mockAdapter.onGet('https://btwapi-18.herokuapp.com/api/v1/getUser').reply(200, {
			data: {
				response
			}
		});

		const expectedActions = [
			{
				type : IdentityConstants.IDENTITY_BTW_USERPROFILE_REQUEST,
				token: token
			},
			{
				type    : IdentityConstants.IDENTITY_BTW_USERPROFILE_SUCCESS,
				response: response
			}
		]
		const store = mockStore({response : []});
		return store.dispatch(IdentityAction.getBtwUserProfile()).then(() => {
			expect(store.getActions()).to.be.equal(expectedActions)
		})
	})

})
