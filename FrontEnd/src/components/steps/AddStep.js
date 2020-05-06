import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddStep extends Component {
    state = {
        label: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addStep(this.state.label);
        this.setState({ label: '' });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                
                <input
                    type="text"
                    name="label"
                    //style={{ flex: '10', padding: '5px' }}
                    placeholder="Ajouter une étape"
                    value={this.state.label}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{ flex: '1' }}
                />
           
             </form>
        )
    }
}

// PropTypes
AddStep.propTypes = {
    addStep: PropTypes.func.isRequired
}

export default AddStep