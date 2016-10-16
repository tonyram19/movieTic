"use strict";
import React from 'react';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Checkout</h1>
                    <div>
                        First Name <br />
                        <input type="text" size="15" id="firstName"/> <br />
                        Last Name <br />
                        <input type="text" size="15" id="lastName"/> <br />
                    </div>

                    <div>
                        Address <br />
                        <input type="text" size="30" id="address"/>
                    </div>

                    <div>
                        Phone Number <br />
                        <input type="text" size="15" id="phone"/>
                    </div>

                    <div>
                        Email <br />
                        <input type="email" size="20" id="email"/>
                    </div>

                    <div>
                        Card Number <br />
                        <input type="text" size="20" data-stripe="number" id="cardNumber"/>
                    </div>

                    <div>
                        Expiration Date (MM/YYYY) <br />
                        <input type="text" size="2" data-stripe="exp_month" id="exp_month"/>
                        <input type="text" size="4" data-stripe="exp_year" id="exp_year"/>
                    </div>

                    <div>
                        CVC <br />
                        <input type="text" size="4" data-stripe="cvc" id="cvc"/>
                    </div>

                    <h2>Total: ${this.props.cost}</h2>

                    <div>
                        <input onClick={this.props.onSubmit} type="button" id="submit" value="Submit Payment"/>
                    </div>
                </form>
            </div>
        );
    }
}
