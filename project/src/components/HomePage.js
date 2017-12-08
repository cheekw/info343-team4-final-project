import React from 'react';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="mt-2 container align-items-center">
                <div className="d-flex flex-nowrap justify-content-center">
                    <img id="logo-bowl" src="https://i.imgur.com/bL3Puos.png" alt="logo" />
                    <img src="https://udonseattle.files.wordpress.com/2011/12/logo-bowl.png" alt="bowl" />
                </div>
                <div className="text-center barlow">
                    <h2 >Easy as <span className="udon-red">1, 2, 3!</span></h2>
                </div>
                <div className="barlow d-flex flex-nowrap justify-content-center my-2">
                    <div className="steps mx-4">
                        <p>1. <span className="udon-red">NOODLE!</span></p>
                        <img src="https://udonseattle.files.wordpress.com/2011/12/menu-kitsune.png?w=170" alt="kitsune udon" />
                        <p><i>Kitsune Udon</i></p>
                    </div>
                    <div className="steps mx-4">
                        <p>2. <span className="udon-red">TOPPINGS & SIDES!</span></p>
                        <img src="https://udonseattle.files.wordpress.com/2011/12/menu-karaage.png?w=170" alt="karaage" />
                        <p><i>Karaage</i></p>
                    </div>
                    <div className="steps mx-4">
                        <p>3. <span className="udon-red">DRINK or DESSERT!</span></p>
                        <img src="https://udonseattle.files.wordpress.com/2011/12/menu-specialty-drink.png?w=170" alt="specialty drink" />
                        <p><i>Specialty Drink</i></p>
                    </div>
                </div>
                <hr/>
                <p className="barlow"><strong>U<span className="udon-red">:D</span>on Fresh Japanese Noodle Station</strong> is a pair of Seattle restaurants specializing in serving fresh, house-made udon noodles cooked to order and delivered in a fast, entertaining, and interactive fashion. Our guests can watch the udon noodles being made, as they customize their meal with freshly prepared toppings and sides to their preference.</p>
            </div>
        );
    }
}