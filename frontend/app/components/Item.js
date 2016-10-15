"use strict";
import React from 'react';
import {render} from 'react-dom';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="item">
                <h3>Item {this.props.number}</h3>
                <span>${this.props.cost}</span>
            </div>
        );
    }
}
