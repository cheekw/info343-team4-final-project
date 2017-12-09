import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

const data = {
	labels: ['Soup 1', 'Soup 2', 'Soup 3', 'Soup 4', 'Soup 5', 'Soup 6', 'Soup 7', 'Soup 8', 'Soup 9', 'Soup 10', 'Soup 11', 'Soup 12'],
	datasets: [
		{
			label: 'Favorites per Item',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [12, 10, 8, 6, 4, 2, 0, 4, 7, 3, 4, 6,]
		}
	]
};

export default class AnalyticsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			menuItems: {},
			accountPrivilege: ''
		};
	}

	componentDidMount() {
		this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push(constants.routes.home);
            }
        });
	}

	componentWillUnmount() {
		this.authUnsub();
	}

	render() {
		return (
			<div className="container chart-view text-center">
				<h2 className="my-3">Most Favorited Soups</h2>
				<HorizontalBar
					data={data}
					width={1000}
					height={300}
					options={{
						responsive: true,
						maintainAspectRatio: false
					}}
				/>
			</div>
		);
	}
};