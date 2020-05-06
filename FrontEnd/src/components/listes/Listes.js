import React, { Component } from 'react'
import Liste from './Liste'
import AddListe from './AddListe'
import Auth from '../auth/auth'

import { postData, getData, isEmpty, isEmail, setValidate } from '../../utils/utils';
import authHeader from '../auth/authHeader';

const APIURL = "http://localhost:3000/listes/"

export class Listes extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.listes.map((liste) => (
                    <Liste
                        key={liste._id}
                        liste={liste}
                        afficheTache={this.props.afficheTache}
                    />
                ))
                }
                {
                    <AddListe
                        addListe={this.props.addListe}
                    />

                }
            </React.Fragment>
        )
    }
}

export default Listes
