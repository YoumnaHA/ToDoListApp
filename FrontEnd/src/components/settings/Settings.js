import React, { Component } from 'react'
import ResetMail from './ResetMail'
import ResetPassword from './ResetPassword'

export class Settings extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid col-10">
                    <h1 className="h1">Paramètres</h1>
                    <ResetMail />
                    <ResetPassword />
                </div>
            </React.Fragment>
        )
    }
}

export default Settings
