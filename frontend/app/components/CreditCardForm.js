"use strict";
import React from 'react';
import axios from 'axios';

export default class CreditCardForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.saveUser = this.saveUser.bind(this);

        this.state = {
            cardToken: null,
            customerToken: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };
    }

    onSubmit() {
        let cardNumber = document.getElementById('cardNumber').value; //4242424242424242
        let expMonth = document.getElementById('exp_month').value; //12
        let expYear = document.getElementById('exp_year').value; //2017
        let cvc = document.getElementById('cvc').value; //123

        this.setState({ firstName: document.getElementById('firstName').value});
        this.setState({ lastName: document.getElementById('lastName').value});
        this.setState({ email: document.getElementById('email').value});
        this.setState({ phone: document.getElementById('phone').value});

        this.createToken(cardNumber, expMonth, expYear, cvc);
    }

    createToken(card, expMonth, expYear, cvc) {

        let self = this;

        Stripe.card.createToken({
            number: card + '',
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc + ''
        }, function(status, response) {
            self.setState({cardToken: response.id});
            console.log(self.state.cardToken);
            self.saveUser();
        });
    }

    saveUser() {

        let self = this;

        let requestBody = {
            'first_name': self.state.firstName + '',
            'last_name': self.state.lastName + '',
            'email': self.state.email + '',
            'address': self.state.address + '',
            'phone_number': self.state.phone + '',
            'stripe_token': self.state.cardToken
        };

        axios.post('http://localhost:8000/users/', requestBody)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        // Stripe.customers.create({
        //     description: self.state.name + '',
        //     source: self.state.cardToken + '', // obtained with Stripe.js
        //     email: self.state.email + ''
        // }, function(err, customer) {
        //     console.log(error);
        // });

        // axios({
        //     method: 'post',
        //     url: '/user/12345',
        //     api_key: 'sk_test_kBOe1hC7tQ4pw8y0pybKuuIn',
        //     data: {
        //         source: self.state.cardToken + '',
        //         description: self.state.name + '',
        //         email: self.state.email + ''
        //     }
        // });

        // let config = {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'sk_test_kBOe1hC7tQ4pw8y0pybKuuIn'
        //     }
        // };
        //
        // axios.post('https://api.stripe.com/v1/customers', {
        //     //api_key: 'sk_test_kBOe1hC7tQ4pw8y0pybKuuIn',
        //     source: self.state.cardToken + '',
        //     description: self.state.name + '',
        //     email: self.state.email + ''
        // }, config)
        // .then(function (response) {
        //     self.setState({customerToken: response.id});
        //     console.log(self.state.customerToken);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    render() {
        return (
            <div>
            <form >
            <div>
                <span>First Name</span>
                <input type="text" size="15" id="firstName"/>
                <span>Last Name</span>
                <input type="text" size="15" id="lastName"/>
            </div>


            <div>
                <span>Address</span>
                <input type="text" size="100" id="address"/>
            </div>

            <div>
                <span>Phnoe Number</span>
                <input type="text" size="15" id="phone"/>
            </div>

            <div>
                <span>Email Address</span>
                <input type="email" size="50" id="email"/>
            </div>

            <div>
                <span>Card Number</span>
                <input type="text" size="20" data-stripe="number" id="cardNumber"/>
            </div>

            <div>
                <span>Expiration (MM/YY)</span>
                <input type="text" size="2" data-stripe="exp_month" id="exp_month"/>
                <input type="text" size="2" data-stripe="exp_year" id="exp_year"/>
            </div>

            <div>
                <span>CVC</span>
                <input type="text" size="4" data-stripe="cvc" id="cvc"/>
            </div>

            <div>
                <input onClick={this.onSubmit} type="button" className="submit" value="Submit Payment"/>
            </div>

            </form>
            </div>
        );
    }
}