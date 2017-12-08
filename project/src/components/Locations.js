import React from 'react';

export default class Locations extends React.Component {
    render() {
        return (
            <div className="barlow container d-flex flex-nowrap justify-content-center text-center row">
                <h2 className="text-center barlow float-right">Our Locations!</h2>
                    <div className="udon-address">4515 University Way NE, Seattle, WA 98105 
                    <div className="mx-3 barlow">(206) 453-3788</div>
                    <div className="mx-3 barlow schedule">Sun-Thurs: <strong>11:30am – 9:30pm</strong> Fri/Sat: <strong>11:30am – 10pm</strong></div>
                    <div className="mx-3 barlow">Located on the "Ave"</div> 
                    <img src="udonave.png" alt="udon-ave"/>              
                </div>
                <div>
                    <div className="udon-address">1640 12th Ave, Seattle, WA 98122</div> 
                    <div className="mx-3 barlow">(206) 466-1471</div>
                    <div className="mx-3 barlow schedule">Mon-Sat: <strong>11:30am – 10pm</strong> Sunday: <strong>11:30am – 9:30pm</strong></div>
                    <img src="udonave.png" alt="udon-caphill"/>
                </div>
            </div>
           
        );
    }
}