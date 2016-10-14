"use strict";
import React from 'react';
import axios from 'axios';

export default class CreditCardForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.createCardToken = this.createCardToken.bind(this);
        this.saveUserToDatabase = this.saveUserToDatabase.bind(this);
        this.everythingIsValid = this.everythingIsValid.bind(this);
        this.validateEmail = this.validateEmail.bind(this);

        this.form = this.form.bind(this);

        this.state = {
            cardToken: null,
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: ''
        };
    }

    onSubmit() {

        //User info. Will be sent to the server
        this.setState({ firstName: document.getElementById('firstName').value});
        this.setState({ lastName: document.getElementById('lastName').value});
        this.setState({ address: document.getElementById('address').value});
        this.setState({ email: document.getElementById('email').value});
        this.setState({ phone: document.getElementById('phone').value});

        //Card info. Will not be sent to the server
        let cardNumber = document.getElementById('cardNumber').value; //4242424242424242
        let expMonth = document.getElementById('exp_month').value; //12
        let expYear = document.getElementById('exp_year').value; //2017
        let cvc = document.getElementById('cvc').value; //123

        if (this.everythingIsValid(this.state.email)) {
            this.createCardToken(cardNumber, expMonth, expYear, cvc);
        }
    }

    createCardToken(card, expMonth, expYear, cvc) {
        let self = this;

        Stripe.card.createToken({
            number: card,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc
        }, function(status, response) {
            self.setState({cardToken: response.id});
            console.log('Card token: ' + self.state.cardToken);
            self.saveUserToDatabase();
        });
    }

    saveUserToDatabase() {
        let self = this;

        let requestBody = {
            'first_name': self.state.firstName,
            'last_name': self.state.lastName,
            'email': self.state.email,
            'address': self.state.address,
            'phone_number': self.state.phone,
            'stripe_token': self.state.cardToken
        };

        axios.post('http://localhost:8000/users/', requestBody)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    everythingIsValid(email) {

        let returnValue = true;

        if (!this.validateEmail(email)) {
            document.getElementById("email").className += "invalidInput";
            console.log('EMAIL NOT VALID');
            returnValue = false;
        }

        if (this.state.firstName.length < 1) {
            document.getElementById("firstName").className += "invalidInput";
            console.log('FIRST NAME NOT VALID');
            returnValue = false;
        }

        if (this.state.lastName.length < 1) {
            document.getElementById("lastName").className += "invalidInput";
            console.log('LAST NAME NOT VALID');
            returnValue = false;
        }

        if (this.state.address.length < 1) {
            document.getElementById("address").className += "invalidInput";
            console.log('ADDRESS NOT VALID');
            returnValue = false;;
        }

        if (this.state.phone.length < 1) {
            document.getElementById("phone").className += "invalidInput";
            console.log('PHONE NUMBER NOT VALID');
            returnValue = false;
        }

        return returnValue;
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    form() {
        return(
            <form>
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

                <div>
                    <input onClick={this.onSubmit} type="button" id="submit" value="Submit Payment"/>
                </div>

            </form>
        );
    }

    render() {
        return (
            <div>
                { this.form() }
            </div>
        );
    }
}
