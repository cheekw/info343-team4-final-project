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
            <div>
                <div></div>
                {this.state.inquiries.map(inquiry => {
                    return (
                        <Mail email={inquiry.author.email}
                            name={inquiry.author.name}
                            inquiry={inquiry.inquiry}
                        />
                    );
                })}
            </div>
        );
    }
}

class Mail extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <p>{this.props.email}</p>
                    <p>{this.props.name}</p>
                </div>
                <div>
                    <p>{this.props.inquiry}</p>
                </div>
            </div>
        );
    }
}