import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import React from 'react'
import Loadable from 'react-loadable'
import App from './App'
import Loading from './component/Loading'
import { Provider } from "react-redux"
import store from "./assets/js/store/index"

const Products = Loadable({
  loader: () => import('./products'),
  loading: Loading,
})

const Product = Loadable({
	loader: () => import('./product'),
	loading: Loading
})

const Cart = Loadable({
	loader: () => import('./cart'),
	loading: Loading
})

const Signin = Loadable({
	loader: () => import('./auth/Signin'),
	loading: Loading
})

const Signup = Loadable({
	loader: () => import('./auth/Signup'),
	loading: Loading
})

const Signout = Loadable({
	loader: () => import('./auth/Signout'),
	loading: Loading
})

const Profile = Loadable({
	loader: () => import('./profile'),
	loading: Loading
})

const Account = Loadable({
	loader: () => import('./account'),
	loading: Loading
})

const Orders = Loadable({
	loader: () => import('./orders'),
	loading: Loading
})

const getRoutes = (store) => {

	// routes for authenticated users only
	const RouteAuth = ({ component: Component, ...rest }) => (
		<Route {...rest}
			render={ props => {
				const state = store.getState()

				if (state.token)
					return <Component {...props} />
				else
					return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
			}}
		/>
	)

	// routes for guest only
	const RouteGuest = ({ component: Component, ...rest }) => (
		<Route {...rest}
			render={ props => {
				const state = store.getState()
				if (state.token === '')
					return <Component {...props} />
				else
					return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
			}}
		/>
	)

	return(
		<App>
			<Route exact={true} path="/" component={Products} />
			<Route path="/product/:id/:slug" component={Product} />

			<RouteAuth path="/cart" component={Cart} />
			<RouteAuth path="/profile" component={Profile} />
			<RouteAuth path="/setting" component={Account} />
			<RouteAuth path="/orders" component={Orders} />

			<RouteGuest path="/signin" component={Signin} />
			<RouteGuest path="/signup" component={Signup} />
			<Route path="/signout" component={Signout} />
		</App>
	)
}

// const RouteGuest

const Routes = () => {

  return (
  	<Router>
			<Switch>
				<Provider store={store}>
	  				{ getRoutes(store) }
				</Provider>
			</Switch>
		</Router>
	)
}

export default Routes