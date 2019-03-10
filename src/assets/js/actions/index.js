import { ADD_TOKEN, REMOVE_TOKEN } from "../constants/action-types";

export function addToken(payload) {
  return { type: ADD_TOKEN, payload }
};

export function removeToken(payload) {
	return { type: REMOVE_TOKEN, payload }
}