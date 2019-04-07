import { 
	ADD_TOKEN, 
	REMOVE_TOKEN,
	UPDATE_CART_ID
} from "../constants/action-types";

export function addToken(payload) {
  return { type: ADD_TOKEN, payload }
};

export function removeToken(payload) {
	return { type: REMOVE_TOKEN, payload }
}

export function updateCartId() {

	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 32; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

	return { type: UPDATE_CART_ID, payload: text }
}