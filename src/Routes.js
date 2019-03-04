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
					<Route key="home" exact={true} path="/" component={Products} />
					<Route key="product" path="/product/:id/:slug" component={Product} />
					<Route key="cart" path="/cart" component={Cart} />
					<Route key="signin" path="/signin" component={Signin} />
					<Route key="signup" path="/signup" component={Signup} />
					<Route key="signout" path="/signout" component={Signout} />
				</App>
			</Switch>
		</Router>
	)
}

export default Routes