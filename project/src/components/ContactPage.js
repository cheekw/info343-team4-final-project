import React from 'react';
import { Link } from 'react-router-dom';
import constants from './constants';
import firebase from 'firebase/app';

export default class ContactPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            inquiry: '',
            currentUser: undefined
        };
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputEmail = this.handleInputEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => this.setState({ currentUser: user }));
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleInputName(event) {
        this.setState({ name: event.target.value });
    }

    handleInputEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleInputInquiry(event) {
        this.setState({ inquiry: event.target.value });
    }

    handleSubmit(event) {
        let inquiryData = {
            author: {
                name: this.state.name,
                email: this.state.email,
            },
            inquiry: this.state.inquiry,
            createdAt: firebase.database.ServerValue.TIMESTAMP        
        };
        let key = firebase.database().ref().child('inquiries/').push().key;
        let updates = {};
        updates['inquiries/' + key] = inquiryData;
        firebase.database().ref().update(updates).then(window.alert("We will try to contact you soon!"));
        this.setState({ name: '', email: '', inquiry: '' })
    }

    render() {
        return (
            <div className="bg-light">
                <div id="business-hours">
                    <h1 className="text-center barlow">Business Hours:</h1>
                    <div className="container d-flex flex-no-wrap justify-content-center">
                        <p className="mx-3 barlow">
                            <strong>Our <span className="udon-red">NEW</span> Capitol Hill location:</strong><br />
                            <span className="px-2"><strong>Mon – Sat</strong>: 11:30am – 10:00pm</span><br />
                            <span className="px-2"><strong>Sun</strong>: 11:30am – 9:30pm</span><br />
                            <br />
                            <strong>University District location:</strong><br />
                            <span className="px-2"><strong>Sun – Thurs</strong>: 11:30am – 9:30pm</span><br />
                            <span className="px-2"><strong>Fri &amp; Sat</strong>: 11:30am – 10:00pm</span><br />
                        </p>
                        <p className="mx-3 barlow">
                            <strong><span className="udon-red">Holiday hours</span> at both locations:</strong><br />
                            <span className="px-2"><strong>Thanksgiving Day (11/23)</strong>: Closed all day</span><br />
                            <span className="px-2"><strong>Black Friday (11/24)</strong>: Closed all day</span><br />
                            <span className="px-2"><strong>Christmas Eve (12/24)</strong>: 11:30am – 8:30pm</span><br />
                            <span className="px-2"><strong>Christmas Day (12/25)</strong>: Closed all day</span><br />
                            <span className="px-2"><strong>New Years Day (1/1)</strong>: Closed all day</span><br />
                        </p>
                    </div>

                </div>
                <br />
                {
                    this.state.currentUser ?
                        <form onSubmit={event => this.handleSubmit(event)}>
                            <div className="container barlow">
                                <h2>Talk to <strong>U:Don!</strong></h2>
                                <p >Do you have a comment or question for the management of U:Don?
                        Please complete this form and we will do our best to respond within 24-48 hours.
                        We look forward to hearing from you!</p>
                                <div className="form-group">
                                    <input className="form-control inquiry-input" type="text" placeholder="Name" autoComplete="off" required
                                        value={this.state.name}
                                        onInput={event => this.handleInputName(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="form-control inquiry-input" type="Email" placeholder="Email" autoComplete="off" required
                                        value={this.state.email}
                                        onInput={event => this.handleInputEmail(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control inquiry-input" type="text" placeholder="Comment or Inquiry..." rows="10" required minLength="20"
                                        value={this.state.inquiry}
                                        onInput={event => this.handleInputInquiry(event)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </div>
                        </form> : <div className="container barlow">
                            Please call us during our business hours from the numbers below. You can also <Link to={constants.routes.signin}>Sign in</Link > or <Link to={constants.routes.signup}>Sign up</Link> to send us a message!
                    </div>
                }
            </div>
        );
    }
}