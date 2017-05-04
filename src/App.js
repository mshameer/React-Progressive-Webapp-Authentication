import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Provider } from "react-redux";
import configureStore from "store";
import routes from "routes";

const Store = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={Store} >
					<Router history={browserHistory} routes={routes} />
			</Provider>
		);
	}
}
