"use strict";
import React from 'react';
import {render} from 'react-dom';

export default class LoadingSpinner extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="spinnerContainer">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        );
    }
}
