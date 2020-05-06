import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Step from './Step'

export class Steps extends Component {
    render() {
        return this.props.steps.map((step) => (
            <div>
                Les Etapes
                <Step
                    key={step._id}
                    step={step}
                    stepMarkComplete={this.props.stepMarkComplete}
                    deleteStep={this.props.deleteStep} />
            </div>
        ));
    }
}

Steps.propTypes = {
    steps: PropTypes.array.isRequired,
    stepMarkComplete: PropTypes.func.isRequired,
    deleteStep: PropTypes.func.isRequired,
}



export default Steps
