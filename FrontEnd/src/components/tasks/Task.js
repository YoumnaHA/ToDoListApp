import React, { Component } from 'react'

export class Task extends Component {
    isCompleted = () => {
        if (this.props.task.done) {
            return {
                textDecoration: 'line-through'
            }
        }
        else {
            return {
                textDecoration: 'none'
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            bgColor: ""
        }
    }

    boxClick = (e) => {
        this.setState({
            bgColor: '#FF7675',
            borderColor: '#FF7675'
        })
    }

    render() {
        const { _id, titre, done } = this.props.task
        return (
            <li className="list-group-item entry">
                <a onClick={this.props.markComplete.bind(this, _id)}>
                    <svg className="rounded-circle" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style={{ backgroundColor: this.state.bgColor }} onClick={this.boxClick}
                    >
                        <path d="M5.25 9.433L2.817 7l-.828.823 3.261 3.26 7-7-.822-.822L5.25 9.433z" fill="#fff" />
                    </svg>
                </a>

                <span className="ml-2">{titre}</span>
                <p className="step ml-4">{'1 sur 2'} • Echéance: aujourd'hui • Note </p>
                <div className="deleteTask float-right">
                    <a onClick={this.props.deleteTask.bind(this, _id)}>
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                fill="#4F4F4F" />
                        </svg>
                    </a>
                </div>
            </li>
        )
    }
}

export default Task
