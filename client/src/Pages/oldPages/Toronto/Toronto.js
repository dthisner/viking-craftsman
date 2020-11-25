import React, {Component} from 'react';
import '../App.css';

import {Container} from 'semantic-ui-react';
import ListBooze from '../component/listBooze/List-Booze';

export default class Toronto extends Component {
	render() {
		return (
			<div>
				<h1>Toronto</h1>
				<Container>
					<ListBooze officeLocation='toronto' />
				</Container>
			</div>
		);
	}
}
