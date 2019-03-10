import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index"
import { getStateFromCookies } from 'redux-cookies-middleware'
import reduxCookiesMiddleware from 'redux-cookies-middleware'

let initialState = {
	token: ''
}

// state to persist in cookies
const paths = {
  'token': { name: 'my_app_token' },
}

// read stored data in cookies and merge it with the initial state
initialState = getStateFromCookies(initialState, paths)

const store = createStore(
	rootReducer, 
	initialState, 
	applyMiddleware(
		reduxCookiesMiddleware(paths)
	)
)
export default store