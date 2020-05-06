import React, { Component } from 'react'
import Listes from '../listes/Listes'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom";
import Auth from '../auth/auth'
import Liste from '../listes/Liste';

export class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_liste: 'this.props.listes.id_liste'
        }
    }

    componentDidMount() {
    }


    signout = () => {
        Auth.logout()
        window.location.reload()
    }


    render() {
        return (
            <div>
                <div className="sidebarLeft col-xs-2 col-sm-3 col-md-2 col-lg-2" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="headerSide mb-5">
                        <NavLink to='/'><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="#FF7675" />
                        </svg>
                            {Auth.getUser().email}
                        </NavLink>
                        <div className="myLists mt-3 mb-3"><a>Mes listes</a></div>


                        <Listes
                            listes={this.props.listes}
                            addListe={this.props.addListe}
                            afficheTache={this.props.afficheTache}
                        />

                    </div>
                    <div className="footerSide">
                        <NavLink to='/settings' className="settings"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.14 12.936c.036-.3.06-.612.06-.936 0-.324-.024-.636-.072-.936l2.028-1.584a.496.496 0 00.12-.612l-1.92-3.324a.488.488 0 00-.588-.216l-2.388.96a7.03 7.03 0 00-1.62-.936l-.36-2.544a.479.479 0 00-.48-.408h-3.84a.467.467 0 00-.468.408l-.36 2.544a7.218 7.218 0 00-1.62.936l-2.388-.96a.475.475 0 00-.588.216l-1.92 3.324a.465.465 0 00.12.612l2.028 1.584c-.048.3-.084.624-.084.936 0 .312.024.636.072.936L2.844 14.52a.496.496 0 00-.12.612l1.92 3.324c.12.216.372.288.588.216l2.388-.96a7.03 7.03 0 001.62.936l.36 2.544c.048.24.24.408.48.408h3.84c.24 0 .444-.168.468-.408l.36-2.544a7.219 7.219 0 001.62-.936l2.388.96c.216.084.468 0 .588-.216l1.92-3.324a.465.465 0 00-.12-.612l-2.004-1.584zM12 15.6A3.61 3.61 0 018.4 12c0-1.98 1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#FF7675" />
                        </svg>Paramètres
                        </NavLink><br />
                        <NavLink to="/signout" onClick={this.signout} className="signOut"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0119 12c0 3.87-3.13 7-7 7A6.995 6.995 0 017.58 6.58L6.17 5.17A8.932 8.932 0 003 12a9 9 0 0018 0c0-2.74-1.23-5.18-3.17-6.83z" fill="#FF7675" />
                        </svg>Déconnexion</NavLink>
                    </div>

                </div>

            </div>
        )
    }
}

export default MenuBar
