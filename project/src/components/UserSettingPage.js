import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class UserSettings extends React.Component {
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
            <div className="container initial-page text-center">
                <ChangePassword />
                <DeleteAccount />
            </div>
        );
    }
}

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        let user = firebase.auth().currentUser;
        user.delete()
            .catch(error => this.setState({ deleteErrorMessage: error.message }));
        firebase.database().ref('users').child(user.uid).remove();
    }

    render() {
        return (
            <div>
                <h2 className="user-settings user-delete">Delete Account</h2>
                {
                    this.state.deleteErrorMessage ?
                        <div className="alert alert-danger">{this.state.deleteErrorMessage}</div> :
                        undefined
                }
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn settings-btn delete-btn" data-toggle="modal" data-target="#deleteAccount" type="submit">Delete Account</button>
                <div className="center">
                    <div className="modal fade" id="deleteAccount" tabIndex="-1" role="dialog" aria-labelledby="DeleteAccountLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div id="modalBody" className="modal-body">
                                    <h3>Are you sure you want to do this? All your data will be permanently deleted.</h3>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleDelete}>Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            password: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handlePasswordChange() {
        // display the error message somehow
        // fix reloading problem
        if (this.state.newPassword === this.state.confirmPassword) {
            if (this.state.newPassword.length < 6) {
                let user = firebase.auth().currentUser;
                let credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword);
                user.reauthenticateWithCredential(credential)
                    .then(user.updatePassword(this.state.newPassword))
                    .catch(error => this.setState({ passwordErrorMessage: error.message }));
                firebase.auth().signOut()
                    .catch(error => this.setState({ errorMessage: error.message }));
            } else {
                this.setState({ passwordErrorMessage: 'New password needs to be six characters long' });
            }
        } else {
            this.setState({ passwordErrorMessage: 'New passwords do not match' });
        }
    }

    render() {
        return (
            <div>
                <h2 className="user-settings">Change Password{this.state.password}</h2>
                {
                    this.state.passwordErrorMessage ?
                        <div className="alert alert-danger">{this.state.passwordErrorMessage}</div> :
                        undefined
                }
                <form onSubmit={this.handlePasswordChange}>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="oldPassword" type="password"
                            placeholder="Enter your old password"
                            value={this.state.oldPassword}
                            onInput={event => this.setState({ oldPassword: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="newPassword" type="password"
                            placeholder="Enter your new password"
                            value={this.state.newPassword}
                            onInput={event => this.setState({ newPassword: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="form-control ml-auto mr-auto" id="confirmPassword" type="password"
                            placeholder="Confirm your new password"
                            value={this.state.confirmPassword}
                            onInput={event => this.setState({ confirmPassword: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn settings-btn" type="submit">Update Password</button>
                    </div>
                </form>
            </div>
        );
    }
}