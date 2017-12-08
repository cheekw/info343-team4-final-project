import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Contact from './components/ContactPage';
import Footer from './components/Footer';
import Home from './components/HomePage';
import Mission from './components/MissionPage';
import Menu from './components/MenuPage';
import NavBar from './components/NavBar';
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
						<Route exact path={constants.routes.cart} component={Cart} />
						<Route exact path={constants.routes.contact} component={Contact} />
						<Route exact path={constants.routes.home} component={Home} />
						<Route exact path={constants.routes.menu}
							render={
								props => <Menu {...props} />
							}
						/>
						<Route exact path={constants.routes.mission} component={Mission} />
						<Route exact path={constants.routes.locations} component={Locations}/>
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
