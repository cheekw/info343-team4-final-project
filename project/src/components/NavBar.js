import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountPrivilege: '',
            user: undefined
        };
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userRef = firebase.database().ref('users').child(user.uid);
                this.userRef.on('value', snapshot => {
                    this.setState({ accountPrivilege: snapshot.val().privilege });
                });
                this.setState({ user: user });
            } else {
                this.setState({ user: undefined });
            }
        });
    }

    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off('value');
        }
        this.authUnsub();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light">
                    <a className="navbar-brand" href={constants.routes.home}>
                        <img src="http://www.mataro-parc.com/sites/default/files/field/operador-logo/udon_-_logo.jpg" alt="udon-logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mx-2">
                                <a className="nav-link barlow" href={constants.routes.menu}>Menu</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link barlow" href={constants.routes.mission}>Our Mission</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link barlow" href={constants.routes.locations}>Locations</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link barlow" href={constants.routes.contact}>Contact Us</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link barlow" href={constants.routes.orderonline}>Order Online</a>
                            </li>
                        </ul>
                        {
                            this.state.user ?
                                <ul className="nav navbar-nav navbar-right">
                                <li><Dropdown accountPrivilege={this.state.accountPrivilege} user={this.state.user} /></li>
                                </ul> :
                                <SignRedirect />
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    // figure out how to transition to home screen after signing out
    handleSignOut(event) {
        event.preventDefault();
        firebase.auth().signOut();
        this.props.router.push(constants.routes.home);
    }

    render() {
        return (
            <div className="dropdown">
                <button className="nav-link barlow dropdown-toggle mx-2" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Options
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <p className="dropdown-header login-info barlow">Signed in as <strong>{this.props.user.displayName}</strong></p>
                    {
                        this.props.accountPrivilege === "admin" ?
                            <a className="dropdown-item barlow" href={constants.routes.analytics}>Analytics</a> :
                            undefined
                    }
                    {
                        this.props.accountPrivilege === "admin" ?
                            <a className="dropdown-item barlow" href={constants.routes.inquiries}>Inquiries</a> :
                            undefined
                    }
                    <a className="dropdown-item barlow" href={constants.routes.settings}>Settings</a>
                    <a className="dropdown-item barlow" onClick={this.handleSignOut}>Sign Out</a>
                </div>
            </div>
        );
    }
}

class SignRedirect extends React.Component {
    render() {
        return (
            <div className="d-flex flex-nowrap">
                <li className="nav-item">
                    <a className="nav-link barlow" href={constants.routes.signin}>Sign In</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link barlow" href={constants.routes.signup}>Sign Up</a>
                </li>
            </div>
        );
    }
}