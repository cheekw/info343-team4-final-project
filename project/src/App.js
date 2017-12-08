import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Analytics from './components/AnalyticsPage';
import Contact from './components/ContactPage';
import Footer from './components/Footer';
import Home from './components/HomePage';
import Mission from './components/MissionPage';
import Menu from './components/MenuPage';
import NavBar from './components/NavBar';
import OnlineOrdering from './components/OnlineOrderingPage';
import SignUp from './components/SignUpPage';
import SignIn from './components/SignInPage';
import UserSettings from './components/UserSettingPage';
import constants from './components/constants';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="page-view">
				<NavBar />
				<Router>
					<Switch>
						<Route exact path={constants.routes.analytics} component={Analytics} />
						<Route exact path={constants.routes.contact} component={Contact} />
						<Route exact path={constants.routes.home} component={Home} />
						<Route exact path={constants.routes.menu}
							render={
								props => <Menu {...props} />
							}
						/>
						<Route exact path={constants.routes.mission} component={Mission} />
						<Route exact path={constants.routes.mission} component={OnlineOrdering} />
						<Route exact path={constants.routes.signup}
							render={
								props => <SignUp {...props} />
							}
						/>
						<Route exact path={constants.routes.signin}
							render={
								props => <SignIn {...props} />
							}
						/>
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
