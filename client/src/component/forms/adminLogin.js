import React, {Component} from 'react';
import {Form, Input} from 'semantic-ui-react';
import axios from 'axios';

let endpoint = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_BE}/${process.env.REACT_APP_API_VERSION}/api`;

export default class AdminLogin extends Component {
	state = {
		name: '',
		baseType: '',
		officeLocation: '',
		why: '',
		firstName: '',
		lastName: '',
	};

	handleChange = (e, {name, value}) => this.setState({[name]: value});

	handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const data = this.state;
		const {name, password} = this.state;
		console.log(data);

		axios({
			method: 'post',
			url: `${endpoint}/admin`,
			data: {
				name,
				password,
			},
			headers: {'Content-Type': 'application/json'},
		})
			.then(() => {
				//access the results here....
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log('Problem with the response');
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log('Problem with the Request');
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Some other problem');
					console.log('Error', error.message);
				}
				console.log(error.config);
			});
	};

	render() {
		const {name, password} = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<h3> Unicorn! Login to use your POWERS! </h3>
				<Form.Group widths='equal'>
					<Form.Field
						id='name'
						control={Input}
						label='Name'
						name='name'
						value={name}
						placeholder='The name of your Unicorn!'
						onChange={this.handleChange}
					/>
					<Form.Field
						id='password'
						control={Input}
						label='password'
						name='password'
						value={password}
						placeholder='Unicorn Password'
						onChange={this.handleChange}
					/>
				</Form.Group>
			</Form>
		);
	}
}
