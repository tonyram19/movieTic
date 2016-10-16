"use strict";
import React from 'react';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.setCost(this.props.cost);
        this.props.goToCheckout();
    }

    render() {
        return (
            <div className="item" onClick={this.onClick}>
                <h3>Product {this.props.number}</h3>
                <span>${this.props.cost}</span>
            </div>
        );
    }
}
