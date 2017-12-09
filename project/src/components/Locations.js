import React from 'react';

export default class Locations extends React.Component {
    render() {
        return (
            <div className="container">
                <h2 className="text-center barlow my-4 bolder">Find <span className="udon-red">U:D</span>on in Seattle</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card-outline-white text-center mb-5">
                            <div className="card-block mt-4">
                                <h5 className="card-title">University District</h5>
                                <div className="mx-3 barlow schedule">Sun-Thurs: <strong>11:30am – 9:30pm</strong> Fri/Sat: <strong>11:30am – 10pm</strong></div>
                                <div className="mx-3 barlow">4515 University Way NE, Seattle, WA 98105</div>
                                <iframe width="400" height="320" frameBorder="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.1659128062533!2d-122.31347939999998!3d47.6617732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148aef4cc1bb:0xa2c676f63cc6874c!2sU:Don Fresh Japanese Noodle Station!5e0!3m2!1sen!2sus!4v1430516683152"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-outline-white text-center mb-5">
                            <div className="card-block mt-4">
                                <h5 className="card-title">Capitol Hill</h5>
                                <div className="mx-3 barlow schedule">Mon-Sat: <strong>11:30am – 10pm</strong> Sunday: <strong>11:30am – 9:30pm</strong></div>
                                <div className="mx-3 barlow">1640 12th Ave, Seattle, WA 98122</div>
                                <iframe width="400" height="320" frameBorder="0" scrolling="no" align="center" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5413092570398!2d-122.31687269999998!3d47.615608099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906acd9df8a539:0x450a40a3da44fe34!2s1640 12th Ave, Seattle, WA 98122!5e0!3m2!1sen!2sus!4v1430517378490"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}