import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

export default class Fish extends Component {

    static propTypes = {
        index: PropTypes.string.isRequired,
        details: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        }),
        addToOrder: PropTypes.func
    };

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    };

    render() {
        const { name, image, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className="menu-fish">
                <img src={ image } alt={ name } />
                <h3 className="fish-name">
                    { name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button onClick={ this.handleClick } disabled={ !isAvailable }>{ isAvailable ? 'Add to Order' : 'Sold out!' }</button>
            </li>
        );
    }
}
