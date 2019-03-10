import { 
	ADD_TOKEN,
	REMOVE_TOKEN,
} from "../constants/action-types";

const initialState = {
  token: ''
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

		default:
			return state
	}
};
export default rootReducer