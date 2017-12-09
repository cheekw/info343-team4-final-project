import React from 'react';

export default class Locations extends React.Component {
    render() {
        return (
        <div className="center">
            <h2 className="text-center barlow">Come check out our locations!</h2>
            <div class="row">
                <div class="col-sm-6">
                <div class="card text-center">
                <div class="card-block">
                  <h3 class="card-title">4515 University Way NE, Seattle, WA 98105 </h3>
                  <div className="mx-3 barlow">(206) 453-3788</div>
                  <div className="mx-3 barlow schedule">Sun-Thurs: <strong>11:30am – 9:30pm</strong> Fri/Sat: <strong>11:30am – 10pm</strong></div>
                  <div className="mx-3 barlow">Located on the "Ave"</div> 
                  <iframe width="400" height="320" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.1659128062533!2d-122.31347939999998!3d47.6617732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148aef4cc1bb:0xa2c676f63cc6874c!2sU:Don Fresh Japanese Noodle Station!5e0!3m2!1sen!2sus!4v1430516683152"></iframe>         
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card text-center">
                <div class="card-block">
                  <h3 class="card-title">1640 12th Ave, Seattle, WA 98122</h3>
                  <div className="mx-3 barlow">(206) 466-1471</div>
                  <div className="mx-3 barlow schedule">Mon-Sat: <strong>11:30am – 10pm</strong> Sunday: <strong>11:30am – 9:30pm</strong></div>
                  <div className="mx-3 barlow">Find our new location on "Cap Hill"!</div>
                  <iframe width="400" height="320" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5413092570398!2d-122.31687269999998!3d47.615608099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906acd9df8a539:0x450a40a3da44fe34!2s1640 12th Ave, Seattle, WA 98122!5e0!3m2!1sen!2sus!4v1430517378490"></iframe>                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
}