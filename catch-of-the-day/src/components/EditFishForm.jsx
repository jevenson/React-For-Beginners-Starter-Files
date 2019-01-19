import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditFishForm extends Component {

    static propTypes = {
        fish: PropTypes.object,
        index: PropTypes.string,
        updateFish: PropTypes.func
    };

    handleChange = (event) => {
        const updatedFish = {
            ...this.props.fish,
            [event.target.name]: event.target.value
        };

        this.props.updateFish(this.props.index, updatedFish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input name="name" onChange={ this.handleChange } value={ this.props.fish.name } type="text" placeholder="Name"/>
                <input name="price" onChange={ this.handleChange } value={ this.props.fish.price } type="text" placeholder="Price"/>
                <select name="status" onChange={ this.handleChange } value={ this.props.fish.status }>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={ this.handleChange } value={ this.props.fish.desc } placeholder="Desc" />
                <input name="image" onChange={ this.handleChange } value={ this.props.fish.image } type="text" placeholder="Image"/>
                <button onClick={ () => this.props.deleteFish(this.props.index) }>Remove Fish</button>
            </div>
        );
    }
}
