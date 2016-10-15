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

        this.state = {
            inStore: true,
            inCheckout: false
        };
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
            <Store />
        );
    }

    checkout() {
        return (
            <div>
                <CreditCardForm />
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
