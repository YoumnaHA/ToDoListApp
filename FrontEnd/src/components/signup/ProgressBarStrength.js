import React, { Component } from 'react'
// import PropTypes from 'prop-types'


class ProgressBarStrength extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strength: 0
        };
    }

    checkPasswordStrength = () => {
        let value = this.props.value
        let strength = 0
        if (value.match(/[0-9]+/)) {
            strength += 1
        }
        if (value.match(/[A-Z]+/)) {
            strength += 1
        }
        if (value.match(/[~<>?]+/)) {
            strength += 1
        }
        if (value.match(/[!@£$%^&*()]+/)) {
            strength += 1
        }
        if (value.length > 4) {
            strength += 1
        }
        switch (strength) {

            case 0:
                strength = 0
                break
            case 1:
                strength = 20
                break;
            case 2:
                strength = 40
                break;
            case 3:
                strength = 60
                break;
            case 4:
                strength = 80
                break;
            case 5:
                strength = 100
                break;
        }
        this.setState({ strength })
    }
    
    componentWillReceiveProps() {
        this.checkPasswordStrength()
    }

    render() {
        return (
            <progress
                className="progressBar mt-2 col"
                max={100}
                value={this.state.strength}
                style={{
                    height: '10px',
                    display: this.props.display
                }}
            />
        );
    }
}

export default ProgressBarStrength;