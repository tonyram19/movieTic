"use strict";
import React from 'react';
import {render} from 'react-dom';

import CreditCardForm from './components/CreditCardForm'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Purchase Form</h1>
                <CreditCardForm />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
