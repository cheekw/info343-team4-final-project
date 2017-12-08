import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(constants.routes.home)
            }
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignIn(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push(constants.routes.home))
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        return (
            <div className="container initial-page text-center">
                <h1>Sign In</h1>
                {
                    this.state.errorMessage ?
                        <div className="alert alert-danger">{this.state.errorMessage}</div> :
                        undefined
                }
                <form onSubmit={this.handleSignIn}>
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
                        <button className="btn btn-dark" type="submit">Sign In</button>
                    </div>
                </form>
                <p>
                    Don't yet have an account? <Link to={constants.routes.signup}>Sign Up!</Link>
                </p>
            </div>
        );
    }
}