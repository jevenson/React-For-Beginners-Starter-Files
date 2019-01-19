import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from './../base';

export default class App extends Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(`${ params.storeId }/order`);

        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${ params.storeId }/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(`${ params.storeId }/order`, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        // remove subscription to firebase changes
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
    };

    addToOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    removeFromOrder = key => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key => {
                                const fish = this.state.fishes[key];
                                return <Fish key={ key } index={ key } details={ fish } addToOrder={ this.addToOrder } />;
                            })
                        }
                    </ul>
                </div>
                <Order
                    fishes={ this.state.fishes }
                    order={ this.state.order }
                    removeFromOrder={ this.removeFromOrder } />
                <Inventory
                    fishes={ this.state.fishes }
                    addFish={ this.addFish }
                    loadSampleFishes={ this.loadSampleFishes }
                    updateFish={ this.updateFish }
                    deleteFish={ this.deleteFish } />
            </div>
        );
    }
}