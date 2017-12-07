import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import '../css/SignInUp.css';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountPrivilege: 'user',
            displayName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(event) {
        event.preventDefault();
        if (this.state.password === this.state.passwordConfirmation) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    user.updateProfile({
                        displayName: this.state.displayName
                    });
                    firebase.database().ref('users').child(user.uid).set({
                        'privilege': this.state.accountPrivilege,
                        'userdata': {
                            'displayName': user.displayName,
                            'uid': user.uid
                        }
                    });
                    this.props.handlePrivilege(this.state.accountPrivilege);
                })
                .then(() => this.props.history.push(constants.routes.home))
                .catch(error => this.setState({ errorMessage: error.message }));
        } else {
            this.setState({ errorMessage: 'Passwords do not match' });
        }
    }

    render() {
        return (
            <div className="container initial-page text-center">
                {/* button for making admin/user accounts */}
                <button onClick={() => this.setState({ accountPrivilege: 'admin' })}>
                    {
                        this.state.accountPrivilege
                    }
                </button>
                <h1>Sign Up</h1>
                {
                    this.state.errorMessage ?
                        <div className="alert alert-danger">{this.state.errorMessage}</div> :
                        undefined
                }
                <form onSubmit={this.handleSignUp}>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="displayName" type="text"
                            placeholder="Enter your display name"
                            value={this.state.displayName}
                            onInput={event => this.setState({ displayName: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="email" type="email"
                            placeholder="Enter your email"
                            value={this.state.email}
                            onInput={event => this.setState({ email: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="password" type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onInput={event => this.setState({ password: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="confirmPassword" type="password"
                            placeholder="Confirm your password"
                            value={this.state.passwordConfirmation}
                            onInput={event => this.setState({ passwordConfirmation: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Sign Up</button>
                    </div>
                </form>
                <p>
                    Have an account? <Link to={constants.routes.signin}>Sign In!</Link>
                </p>
            </div>
        );
    }
}