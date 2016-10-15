"use strict";
import React from 'react';
import {render} from 'react-dom';

import CreditCardForm from './components/CreditCardForm'
import Store from './components/Store'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.goToStore = this.goToStore.bind(this);
        this.goToCheckout = this.goToCheckout.bind(this);
        this.store = this.store.bind(this);
        this.checkout = this.checkout.bind(this);
        this.setCost = this.setCost.bind(this);

        this.state = {
            inStore: true,
            inCheckout: false,
            cost: '0'
        };
    }

    setCost(theCost) {
        this.setState({
            cost: theCost
        })
    }

    goToStore() {
        this.setState({
            inStore: true,
            inCheckout: false
        });
    }

    goToCheckout() {
        this.setState({
            inStore: false,
            inCheckout: true
        });
    }

    store() {
        return(
            <Store goToCheckout={this.goToCheckout} setCost={this.setCost}/>
        );
    }

    checkout() {
        return (
            <div>
                <CreditCardForm cost={this.state.cost}/>
            </div>
        );
    }

    render() {
        if (this.state.inStore) {
            return this.store();
        } else if (this.state.inCheckout) {
            return this.checkout();
        }

    }
}

render(<App/>, document.getElementById('app'));
