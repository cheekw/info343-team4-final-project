import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import profile from '../img/udon-face.png';
import deleteIcon from '../img/delete.png';

export default class Inquiries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inquiries: {}
        };
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.inquiryRef = firebase.database().ref('inquiries');
                this.inquiryRef.on('value', snapshot => this.setState({ inquiries: snapshot.val() }));
            } else {
                this.props.history.push(constants.routes.home);
            }
        });
    }

    componentWillUnmount() {
        if (this.inquiryRef) {
            this.inquiryRef.off('value');
        }
        this.authUnsub();
    }

    render() {
        return (
            <div className="container h-100 text-center">
                <h3 className="my-4">Inquiries List</h3>
                <div className="inquiries-view">
                    {
                        this.state.inquiries ? Object.keys(this.state.inquiries).map((key, index) =>
                            <Message
                                key={index}
                                inquiryKey={key}
                                email={this.state.inquiries[key].author.email}
                                name={this.state.inquiries[key].author.name}
                                createdAt={this.state.inquiries[key].createdAt}
                                inquiry={this.state.inquiries[key].inquiry}
                            />
                        ) : undefined
                    }
                </div>
            </div>
        );
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formatTime = this.formatTime.bind(this);
        this.removeMessage = this.removeMessage.bind(this);
    }

    formatTime(timestamp) {
        let date = new Date(timestamp);
        return date.toString();
    }

    removeMessage() {
        firebase.database().ref('inquiries/' + this.props.inquiryKey).remove();
    }

    render() {
        return (
            <div className="container message media text-left">
                <img className="profile-image" src={profile} alt="profile" />
                <div className="media-body">

                    <img className="delete-icon ml-1" src={deleteIcon} alt="delete" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
                        <div className="dropdown-header">Delete Message?</div>
                        <div className="dropdown-item" onClick={() => this.removeMessage()}>Yes</div>
                    </div>
                    <div className="barlow"><strong className="bolder">Name: </strong>{this.props.name} <span className="message-date text-muted">{this.formatTime(this.props.createdAt)}</span></div>
                    <div className="barlow"><strong className="bolder">Email: </strong>{this.props.email}</div>
                    <div className="barlow"><strong className="bolder">Inquiry: </strong>{this.props.inquiry}</div>
                </div>
            </div>
        );
    }
}