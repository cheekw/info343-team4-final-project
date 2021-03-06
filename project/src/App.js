import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './components/ContactPage';
import Footer from './components/Footer';
import Home from './components/HomePage';
import Inquiries from './components/InquiriesPage';
import Mission from './components/MissionPage';
import Menu from './components/MenuPage';
import NavBar from './components/NavBar';
import OrderOnline from './components/OrderOnlinePage';
import SignUp from './components/SignUpPage';
import SignIn from './components/SignInPage';
import UserSettings from './components/UserSettingPage';
import constants from './components/constants';
import Locations from './components/Locations';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="page-view">
				<NavBar />
				<Router>
					<Switch>
						<Route exact path={constants.routes.contact} component={Contact} />
						<Route exact path={constants.routes.home} component={Home} />
						<Route exact path={constants.routes.inquiries} component={Inquiries} />
						<Route exact path={constants.routes.locations} component={Locations} />
						<Route exact path={constants.routes.mission} component={Mission} />
						<Route exact path={constants.routes.menu} component={Menu} />
						<Route exact path={constants.routes.orderonline} component={OrderOnline} />
						<Route exact path={constants.routes.signup} component={SignUp} />
						<Route exact path={constants.routes.signin} component={SignIn} />
						<Route exact path={constants.routes.settings} component={UserSettings} />
						<Route component={Home} />
					</Switch>
				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
