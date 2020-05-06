import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Step extends Component {
    render() {
        const { _taskId, label, completed } = this.props.step;
        return (
            <div>
                <input
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={this.props.stepMarkComplete.bind(this, _taskId)}
                />{" "}
                {label}
                <button onClick={this.props.deleteStep.bind(this, _taskId)} style={btnStyle}>
                    x
        </button>

            </div>
        )
    }
}

Step.propTypes = {
    step: PropTypes.object.isRequired,
    StepMarkComplete: PropTypes.func.isRequired,
    deleteStep: PropTypes.func.isRequired,
};

const btnStyle = {
    background: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
};
export default Step
