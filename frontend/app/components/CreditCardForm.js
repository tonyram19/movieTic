"use strict";
import React from 'react';
import axios from 'axios';

import LoadingSpinner from './LoadingSpinner'


export default class CreditCardForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitCallBack = this.onSubmitCallBack.bind(this);
        this.createCardToken = this.createCardToken.bind(this);
        this.saveUserToDatabase = this.saveUserToDatabase.bind(this);
        this.everythingIsValid = this.everythingIsValid.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
        this.goToWaitCheckoutResult = this.goToWaitCheckoutResult.bind(this);
        this.goToCheckoutSuccessful = this.goToCheckoutSuccessful.bind(this);

        this.form = this.form.bind(this);
        this.awaitingCheckoutResult = this.awaitingCheckoutResult.bind(this);
        this.checkoutSuccessful = this.checkoutSuccessful.bind(this);

        this.state = {
            cardToken: null,
            customerToken: null,
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',

            awaitingCheckoutResult: false,
            checkoutSuccessful: false,
        };
    }

    goToWaitCheckoutResult() {
        this.setState({
            awaitingCheckoutResult: true,
            checkoutSuccessful: false
        });
    }

    goToCheckoutSuccessful() {
        this.setState({
            awaitingCheckoutResult: false,
            checkoutSuccessful: true
        });
    }

    onSubmit() {
        //User info. Will be sent to the server
        this.setState({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        }, this.onSubmitCallBack);

    }

    onSubmitCallBack() {

        if (this.everythingIsValid()) {

            this.goToWaitCheckoutResult();

            //Card info. Will not be sent to the server
            let cardNumber = document.getElementById('cardNumber').value; //4242424242424242
            let expMonth = document.getElementById('exp_month').value; //12
            let expYear = document.getElementById('exp_year').value; //2017
            let cvc = document.getElementById('cvc').value; //123

            this.createCardToken(cardNumber, expMonth, expYear, cvc);
        }
    }

    everythingIsValid() {

        let returnValue = true;

        if (!this.validateEmail(this.state.email)) {
            document.getElementById("email").className = "invalidInput";
            console.log('EMAIL NOT VALID');
            returnValue = false;
        }

        if (this.state.firstName.length < 1) {
            document.getElementById("firstName").className = "invalidInput";
            console.log('FIRST NAME NOT VALID');
            returnValue = false;
        }

        if (this.state.lastName.length < 1) {
            document.getElementById("lastName").className = "invalidInput";
            console.log('LAST NAME NOT VALID');
            returnValue = false;
        }

        if (this.state.address.length < 1) {
            document.getElementById("address").className = "invalidInput";
            console.log('ADDRESS NOT VALID');
            returnValue = false;;
        }

        if (this.state.phone.length < 1) {
            document.getElementById("phone").className = "invalidInput";
            console.log('PHONE NUMBER NOT VALID');
            returnValue = false;
        }

        return returnValue;
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    createCardToken(card, expMonth, expYear, cvc) {
        let self = this;

        Stripe.card.createToken({
            number: card,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc
        }, function(status, response) {
            if (status == '402' || status == '400') {
                console.log('Well, shit');
            } else {
                self.setState({cardToken: response.id}, self.saveUserToDatabase);
            }
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
            'card_token': self.state.cardToken,
            'customer_token': 'xxx'
        };

        axios.post('http://localhost:8000/users/', requestBody)
        .then(function (response) {
            console.log(response);
            self.setState({
                customerToken: response.data.customer_token
            }, self.createTransaction);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    createTransaction() {

        let self = this;

        let requestBody = {
            'amount': parseInt(self.props.cost * 100 + ''),
            'customer_token': self.state.customerToken,
            'card_token': self.state.cardToken
        };


        axios.post('http://localhost:8000/transactions/', requestBody)
        .then(function (response) {
            console.log(response);

            if (response.status == '200' || response.status == '201'){
                console.log("Transaction successful!!!");
                self.goToCheckoutSuccessful();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    awaitingCheckoutResult() {
        return(
            <LoadingSpinner />
        );
    }

    checkoutSuccessful() {
        return(
            <div>
                <h1>Checkout successful!</h1>
            </div>
        );
    }

    form() {
        return(
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
                        <input onClick={this.onSubmit} type="button" id="submit" value="Submit Payment"/>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        if (this.state.awaitingCheckoutResult) {
            return this.awaitingCheckoutResult();

        } else if (this.state.checkoutSuccessful) {
            return this.checkoutSuccessful();

        } else {
            return this.form();
        }
    }
}
