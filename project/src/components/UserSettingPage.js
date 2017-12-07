import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountPrivilege: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            password: ''
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                this.userRef = firebase.database().ref('users').child(user.uid);
                this.userRef.on('value', snapshot => {
                    let privilege = snapshot.val();
                    if (privilege !== null) {
                        this.setState({ accountPrivilege: privilege.privilege });
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off();
        }
        this.authUnsub();
    }

    handleDelete() {
        let user = firebase.auth().currentUser;
        user.delete()
            .catch(error => this.setState({ deleteErrorMessage: error.message }));
        firebase.database().ref('users').child(user.uid).remove();
    }

    handlePasswordChange() {
        let user = firebase.auth().currentUser;
        if (this.statenewPassword === this.state.confirmPassword) {
            user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword))
                .updatePassword(this.state.newPassword)
                .catch(error => this.setState({ passwordErrorMessage: error.message }));
        }
    }

    render() {
        return (
            <div className="container initial-page text-center">
                <h2 className="user-settings">Change Password{this.state.password}</h2>
                {
                    this.state.errorMessage ?
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
                <h2 className="user-settings user-delete">Delete Account</h2>
                {
                    this.state.errorMessage ?
                        <div className="alert alert-danger">{this.state.deleteErrorMessage}</div> :
                        undefined
                }
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <form onSubmit={this.handleDelete}>
                    <button className="btn settings-btn delete-btn" type="submit">Delete Account</button>
                    {/* <div className="center">
                        <div className="modal fade" id="deleteAccount" tabIndex="-1" role="dialog" aria-labelledby="DeleteAccountLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div id="modalHeader" className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div id="modalBody" className="modal-body">
                                        <h3>Are you sure you want to do this?</h3>
                                        <h3>All your data will be permanently deleted.</h3>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" onClick={() => this.handleDelete}>Delete</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                    <input className="hide" type="file" accept="image/*" required
                                        ref={imageInput => this.imageInput = imageInput}
                                        onChange={(event) => this.handleUploadImage(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </form>
            </div>
        );
    }
}