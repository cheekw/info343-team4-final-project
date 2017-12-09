import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class Inquiries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inquiries: []
        };
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.inquiryRef = firebase.database().ref('inquiries');
                this.inquiryRef.on('value', snapshot => {
                    let inquiries = snapshot.val();
                    if (inquiries !== null) {
                        let newInquiries = [];
                        for (let inquiry in inquiries) {
                            newInquiries.push({
                                author: {
                                    email: inquiries[inquiry].author.email,
                                    name: inquiries[inquiry].author.name
                                },
                                createdAt: inquiries[inquiry].createdAt,
                                inquiry: inquiries[inquiry].inquiry
                            });
                        }
                        this.setState({ inquiries: newInquiries });
                    } else {
                        this.setState({ inquiries: [] });
                    }
                });
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
            <div className="container">
                {this.state.inquiries.map((inquiry, index) => {
                    return (
                        <Message 
                            key={index}
                            email={inquiry.author.email}
                            name={inquiry.author.name}
                            createdAt={inquiry.createdAt}
                            inquiry={inquiry.inquiry}
                        />
                    );
                })}
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
        return "" + date;
    }

    removeMessage(event) {
        event.preventDefault();
        firebase.database().ref('inquiries').child(this.props.message.id).remove();
    }

    render() {
        return (
            <div className="container">
                <div className="">
                    <p className="barlow">{this.props.email} <span className="barlow ">{this.formatTime(this.props.createdAt)}</span></p>
                    <p className="barlow">{this.props.inquiry}</p>
                </div>
            </div>
        );
    }
}