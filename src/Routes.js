import {
  BrowserRouter as Router,
  Route,
	Switch
} from 'react-router-dom'
import React from 'react'
import Loadable from 'react-loadable'
import App from './App'
import Loading from './component/Loading'

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

const Routes = props => {
  return (
  	<Router>
			<Switch>
	  			<App>
					<Route exact={true} path="/" component={Products} />
					<Route path="/product/:id/:slug" component={Product} />
					<Route path="/cart" component={Cart} />
					<Route path="/signin" component={Signin} />
					<Route path="/signup" component={Signup} />
					<Route path="/signout" component={Signout} />
				</App>
			</Switch>
		</Router>
	)
}

export default Routes