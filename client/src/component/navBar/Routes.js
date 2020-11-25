import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router';

import LandingPage from '../../Pages/LandingPage/LandingPage';
import Blog from '../../Pages/Blog/Blog';
import AboutMe from '../../Pages/AboutMe/AboutMe';

import history from './history';

export default class Routes extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path='/' exact component={LandingPage} />
					<Route path='/home' component={LandingPage} />
					<Route path='/blog' component={Blog} />
					<Route path='/aboutme' component={AboutMe} />
				</Switch>
			</Router>
		);
	}
}
