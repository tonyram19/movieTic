"use strict";
import React from 'react';
import {render} from 'react-dom';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.setCost(this.props.cost);
        this.props.goToCheckout();
        console.log(this.props.cost);
    }

    render() {
        return (
            <div className="item" onClick={this.onClick}>
                <h3>Item {this.props.number}</h3>
                <span>${this.props.cost}</span>
            </div>
        );
    }
}
