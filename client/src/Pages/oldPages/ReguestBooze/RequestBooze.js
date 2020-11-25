import React, {Component} from 'react';
import '../App.css';

import {Container} from 'semantic-ui-react';
import FormRequestBooze from '../../../component/forms/reguestBooze';
import ListRequest from '../../../component/listBooze/List-Request';

export default class Toronto extends Component {
	render() {
		return (
			<div>
				<h1>Request Booze</h1>
				<Container>
					<FormRequestBooze officeLocation='boozeRequests' />
				</Container>
				<div>
					<h1> Booze already requested</h1>
					<Container>
						<ListRequest officeLocation='boozeRequests' />
					</Container>
				</div>
			</div>
		);
	}
}
