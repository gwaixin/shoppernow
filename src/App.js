import React from 'react';
import Header from './common/Header'


class App extends React.Component {
	render() {
		return(
			<div id="app">
				<Header />
				<div className="app-content mt-5 mb-5">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App