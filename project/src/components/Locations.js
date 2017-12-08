import React from 'react';

export default class Locations extends React.Component {
    render() {
        return (
            <div className="barlow container d-flex flex-nowrap justify-content-center text-center row col-sm-12">
                <h2 className="text-center barlow float-right">Our Locations!</h2>
                    <div className="udon-address">4515 University Way NE, Seattle, WA 98105 
                    <div className="mx-3 barlow">(206) 453-3788</div>
                    <div className="mx-3 barlow schedule">Sun-Thurs: <strong>11:30am – 9:30pm</strong> Fri/Sat: <strong>11:30am – 10pm</strong></div>
                    <div className="mx-3 barlow">Located on the "Ave"</div> 
                    <a href="https://www.google.com/maps/place/U:Don+Fresh+Japanese+Noodle+Station/@47.661767,-122.313403,16z/data=!4m5!3m4!1s0x0:0xa2c676f63cc6874c!8m2!3d47.6617673!4d-122.3134035?hl=en-US">
                    <img src="udonave.png" alt="udon-ave"/>   
                    </a>           
                </div>
                <div>
                    <div className="udon-address">1640 12th Ave, Seattle, WA 98122</div> 
                    <div className="mx-3 barlow">(206) 466-1471</div>
                    <div className="mx-3 barlow schedule">Mon-Sat: <strong>11:30am – 10pm</strong> Sunday: <strong>11:30am – 9:30pm</strong></div>
                    <div className="mx-3 barlow">Find our new location on "Cap Hill"!</div>
                    <a href="https://www.google.com/maps/place/U:Don+Fresh+Japanese+Noodle+Station/@47.615766,-122.316415,16z/data=!4m13!1m7!3m6!1s0x54906acd9b924c13:0xf7efd071f8f5ea6d!2s1640+12th+Ave,+Seattle,+WA+98122!3b1!8m2!3d47.6157664!4d-122.3164151!3m4!1s0x54906acd98bc04df:0x63e5c893c12adf0b!8m2!3d47.6158364!4d-122.3164901?hl=en-US">
                    <img src="udoncaphill.png" alt="udon-caphill"/>
                    </a>
                </div>
            </div>
           
        );
    }
}