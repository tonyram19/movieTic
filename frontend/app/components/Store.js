"use strict";
import React from 'react';
import {render} from 'react-dom';

import Item from './Item'

export default class Store extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="store">
                <h1>Items Available For Purchase</h1>
                <Item number="1" cost="19.99" goToCheckout={this.props.goToCheckout} setCost={this.props.setCost}/>
                <Item number="2" cost="24.99" goToCheckout={this.props.goToCheckout} setCost={this.props.setCost}/>
                <Item number="3" cost="49.99" goToCheckout={this.props.goToCheckout} setCost={this.props.setCost}/>
            </div>
        );
    }
}
