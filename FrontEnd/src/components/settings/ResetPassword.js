import React, { Component } from 'react'
import { Container, Row, FormGroup, Form, Button, Label, Alert } from "reactstrap";

import { postData, getData, isEmpty, isEmail, setValidate, putData } from '../../utils/utils';
import Auth from '../auth/auth'


const APIURL = 'http://localhost:3001/user/update/password'

export class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            n_password: "",
            r_password: '',
            formErreurs: {
                password: "",
                n_password: "",
                r_password: ''
            },
            isValidated: {
                password: "",
                n_password: "",
                r_password: ''
            },
            message: ''
        }
        this.initailState = this.state
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { email, r_email, token, message, password, n_password } = this.state


        if (this.handleForm(e)) {

            putData(APIURL, {
                user_id: Auth.getUser().user_id,
                password,
                n_password
            }).then(
                (data) => {
                    if (data.error) {//si le serveur renvoie un message d'erreur
                        this.state.message = data.error
                        this.setState({ message })
                    }
                    else {
                        this.handleReset(e)
                        this.setState({ message: data.message })
                    }
                }
            )
        }
    }


    handleValidation = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let message = this.state.message
        const { formErreurs, isValidated, password, n_password, r_password } = this.state

        if (isEmpty(password)) {
            formErreurs.password = "Veuillez renseigner le mot de passe actuel"
        }
        else {
            formErreurs.password = "";
            if (isEmpty(n_password)) {
                formErreurs.n_password = 'Veuillez renseignez un nouveau mot de passe'
            }
            else {
                formErreurs.n_password = ''
                if (isEmpty(r_password)) {
                    formErreurs.r_password = 'Veuillez confirmer le mot de passe'
                }
                else if (n_password !== r_password) {
                    formErreurs.r_password = "le mot de pass ne coresspond pas"
                }
                else {
                    formErreurs.r_password = ""
                    isValidated.r_password = setValidate(formErreurs.r_password)
                }
            }
            isValidated.n_password = setValidate(formErreurs.n_password)
        }

        isValidated.password = setValidate(formErreurs.password)
        // isValidated.r_password=setValidate(formErreurs.r_password)

        this.setState({ formErreurs, isValidated })
    }

    handleForm = (e) => {
        this.handleValidation(e)
        const { formErreurs } = this.state
        let ok = true

        Object.values(formErreurs).forEach((val) => {
            if (val.length > 0) {
                ok = false
            }
        })
        return ok
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target// e.targert.name 


        this.setState({ [name]: value })
    };

    handleReset = (e) => {
        // e.preventDefault()
        this.setState(this.initailState)
    }


    render() {
        return (
            <React.Fragment>
                <Row className="">
                    <div className="col-5">
                        <Form
                            onSubmit={this.handleSubmit}
                            noValidate
                        >
                            <p className={"h4"}>Mot de passe</p>

                            <FormGroup >
                                <label>Mot de passe actuel</label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.isValidated.password}`} //class 
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}//un evenement
                                />
                                <span className="text-danger" >{this.state.formErreurs.password}</span>
                            </FormGroup>
                            <FormGroup >
                                <Label>Nouveau mot de passe </Label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.isValidated.n_password}`} //class 
                                    placeholder="password"
                                    name="n_password"
                                    value={this.state.n_password}
                                    onChange={this.handleChange}//un evenement
                                />
                                <span className="text-danger" >{this.state.formErreurs.n_password}</span>
                            </FormGroup>
                            <FormGroup >
                                <Label>Confirmer le nouveau mot de passe </Label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.isValidated.r_password}`} //class 
                                    placeholder="password"
                                    name="r_password"
                                    value={this.state.r_password}
                                    onChange={this.handleChange}//un evenement
                                />
                                <span className="text-danger" >{this.state.formErreurs.r_password}</span>
                            </FormGroup>
                            <FormGroup>
                                <input
                                    type="submit"
                                    className="btn btn-orange btn-block"
                                    value="Modifier le mot de passe"
                                />
                            </FormGroup>
                            <FormGroup className="">
                                <p className={"text-center text-success"}>{this.state.message}</p>
                            </FormGroup>
                        </Form>
                    </div>
                </Row>
            </React.Fragment>
        )
    }
}


export default ResetPassword
