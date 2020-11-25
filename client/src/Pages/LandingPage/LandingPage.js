import React, {Component} from 'react';
import '../../App.css';

import {Container} from 'semantic-ui-react';
import FullCarousel from '../../component/carousel/FullCarousel';

export default class LandingPage extends Component {
	render() {
		return (
			<div>
				<h1>Landing Page</h1>
				<Container>
					<FullCarousel />
				</Container>
			</div>
		);
	}
}
