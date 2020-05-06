import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom";

import Settings from '../settings/Settings'
import Listes from '../listes/Listes';
import MenuBar from '../menu/MenuBar';
import Tasks from '../tasks/Tasks';
import Auth from '../auth/auth'

import { postData, getData, isEmpty, isEmail, setValidate, putData, deleteData, getUrl } from '../../utils/utils';
import authHeader from '../auth/authHeader';
import Axios from 'axios';
import Liste from '../listes/Liste';
// import ErrorHandler from '../../utils/ErrorHandler';

const APIURL = "http://localhost:3001/"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _userId: Auth.getUser().user_id,
            listes: [],
            tasks: [],
            steps: [],
            _listId: '',
            _taskId: ''        }
    }



    componentWillMount() {

        getData(APIURL + 'lists/?_userId=' + this.state._userId)
            .then((data) => {
                this.setState({ listes: data })
            })


        //tous les listes des taches pour une utilisateur
        let url = ''
        if (this.state._listId) {
            url = APIURL + 'tasks/?_listId=' + this.state._listId

        }
        else {
            url = APIURL + 'tasks/?_userId=' + this.state._userId
        }
        getData(url).then(
            (res) => {
                this.setState({
                    tasks: res
                })
            }
        )

       

    }


    deleteTask = (id_tache) => {
        deleteData(APIURL + 'tasks/delete/' + id_tache)
            .then(json => {
                this.setState({
                    tasks: this.state.tasks.filter(task =>
                        id_tache !== task._id
                    )
                })
            });
    }

    markComplete = (id_tache) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task._id === id_tache) {
                    task.done = !task.done
                }
                return task
            })
        })

        let [In] = this.state.tasks.filter(task => id_tache === task._id)
        putData(APIURL + 'tasks/update/' + id_tache, In)
            .then((res) => {

            })

    }
    addTask = async (titre) => {
        let res = await postData(APIURL + 'tasks/create/', {
            _userId: this.state._userId,
            _listId: this.state._listId,
            titre: titre,
        })
        const data = await res.json()
        this.setState({ tasks: [...this.state.tasks, data.data] })
    }

    addListe = async (liste) => {
        let res = await postData(APIURL + 'lists/create', {
            _userId: this.state._userId,
            name: liste,
        })

        const data = await res.json()
        this.setState({
            listes: [...this.state.listes, data.data]
        })
    }

    afficheTache = (_id) => {
        this.setState({ _listId: _id })
  
        getData(APIURL + 'tasks/?_listId=' + _id).then(
            (res) => {
                this.setState({
                    tasks: res
                })
            }
        )
        // this.props.setName(this.state._listId)
    }

    deleteListe = () => {
        const { _listId } = this.state
        deleteData(APIURL + 'lists/delete/' + _listId).then(
            (res) => {
                this.setState({ _listId })
            }
        )
    }

    render() {
        const { listes, tasks, _listId } = this.state
        return (
            <div className="contaier-fluid h-100">
                <div className="row ml-0">

                {
                    <MenuBar
                        listes={listes}
                        addListe={this.addListe}
                        afficheTache={this.afficheTache}
                    />
                }
                    <Router>
                    
                        <Route exact path='/'>
                                <Tasks
                                    currentList={listes.filter(liste => (
                                        liste._id === _listId
                                    ))}
                                    //listes={listes}
                                    tasks={tasks}
                                    markComplete={this.markComplete}
                                    deleteTask={this.deleteTask}
                                    addTask={this.addTask}
                                    deleteListe={this.deleteListe}
                                // setName={this.setName}
                                />
                        </Route>
                        <Route  path="/settings">
                            <Settings />
                        </Route>

                    </Router>


                    {<div className="sidebarRight col-2 " style={{ backgroundColor: "#F5F5F5" }}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="taskName">Titre</label>
                                <input type="text" className="form-control" id="taskName" placeholder="Titre de liste" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="steps">Etapes</label>

                                <div className="form-row">
                                    <div className="formStep rounded-left form-control col-lg-11 mb-2">
                                        <svg className="checkedStep" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9.433L2.817 7l-.828.823 3.261 3.26 7-7-.822-.822L5.25 9.433z" fill="#fff" /></svg>
                                        <p className="mr-2"> Aller sur github</p>
                                    </div>
                                    <div className="col-lg-1">
                                        <a className="removeStep"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.667 7.333v1.334h6.666V7.333H4.667zm3.333-6A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.669 6.669 0 008 1.333zm0 12A5.34 5.34 0 012.667 8 5.34 5.34 0 018 2.667 5.34 5.34 0 0113.333 8 5.34 5.34 0 018 13.333z" fill="#D63031" /></svg></a>
                                    </div>
                                    <div className="formStep rounded-left form-control col-sm-11 mb-2">
                                        <svg className="rounded-circle" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9.433L2.817 7l-.828.823 3.261 3.26 7-7-.822-.822L5.25 9.433z" fill="#fff" /></svg>
                                        <p className="mr-2"> Créer le repository</p>
                                    </div>
                                    <div className="col-lg-1">
                                        <a className="removeStep"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.667 7.333v1.334h6.666V7.333H4.667zm3.333-6A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.669 6.669 0 008 1.333zm0 12A5.34 5.34 0 012.667 8 5.34 5.34 0 018 2.667 5.34 5.34 0 0113.333 8 5.34 5.34 0 018 13.333z" fill="#D63031" /></svg></a>
                                    </div>
                                    <div className="col-lg-11">
                                        <input type="text" className="form-control mb-2" className="steps" placeholder="Entrer les étapes" />
                                    </div>
                                    <div className="col-lg-1">
                                        <a className="addStep"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000" /></svg></a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Echéance</label>
                                <input type="text" className="form-control" id="date" placeholder="28/02/2019" />
                                <a className="calendar"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 2h-.666V.667h-1.334V2H4.667V.667H3.333V2h-.666c-.734 0-1.334.6-1.334 1.333V14c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V3.333c0-.733-.6-1.333-1.334-1.333zm0 12H2.667V5.333h10.666V14z" fill="#000" /></svg></a>
                            </div>
                            <div className="form-group">
                                <label htmlFor="note">Note</label>
                                <textarea className="form-control" id="note" rows="3" placeholder="Quelques détails"></textarea>
                            </div>

                            <button type="submit" className="btn" style={{ backgroundColor: "#FF7675", color: "white" }}>Enregistrer</button>
                            <button type="submit" className="btn" style={{ backgroundColor: "grey", color: "white" }}>Annuler</button>
                        </form>
                    </div>}


                </div>
            </div>
        )
    }
}

export default Home
