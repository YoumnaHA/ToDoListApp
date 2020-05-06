import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom";
import Tasks from '../tasks/Tasks';

export class Liste extends Component {
    render() {
        const { _id, name } = this.props.liste
        return (
            <div>
                <p onClick={()=>this.props.afficheTache(_id)}>
                    {name}
                </p>
            </div>
        )
    }
}

export default Liste
