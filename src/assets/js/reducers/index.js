import { 
	ADD_TOKEN,
	REMOVE_TOKEN,
	UPDATE_CART_ID
} from "../constants/action-types";

const initialState = {
	token: '',
	cartId: ''
};


function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TOKEN: {
			return Object.assign({}, state, {
				token: action.payload
			})
		}

		case REMOVE_TOKEN: {
			return Object.assign({}, state, {
				token: ''
			})
		}

		case UPDATE_CART_ID: {
			return Object.assign({}, state, {
				cartId: action.payload
			})
		}

		default:
			return state
	}
};
export default rootReducer