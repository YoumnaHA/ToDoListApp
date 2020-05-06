import React, { Component } from 'react'
import { Container, Row, FormGroup, Form, Button, Label, Alert } from "reactstrap";

import { postData, getData, isEmpty, isEmail, setValidate, putData } from '../../utils/utils';
import Auth from '../auth/auth'

const APIURL = 'http://localhost:3001/user/update/mail'


export class ResetMail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            r_email: "",
            formErreurs: {
                email: "",
                r_email: ""
            },
            isValidated: {
                email: "",
                r_email: ""
            },
            message: ''
        }
        this.initailState = this.state
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { email, r_email, token, message } = this.state


        if (this.handleForm(e)) {
            console.log(Auth.getUser().user_id)

            putData(APIURL, {
                user_id: Auth.getUser().user_id,
                email
            }).then(
                (data) => {
                    if (data.error) {//si le serveur renvoie un message d'erreur
                        this.state.message = data.error
                        // message = data.error
                        this.setState({ message })
                    }
                    else {
                        console.log(data)
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
        const { formErreurs, isValidated, email, r_email } = this.state

        if (isEmpty(email)) {
            formErreurs.email = "Veuillez renseigner une adresse e-mail"
        }
        else if (!isEmail(email)) {
            formErreurs.email = "Veuillez saisir une adresse mail valide";
        }
        else {
            formErreurs.email = "";
            if (isEmpty(r_email)) {
                formErreurs.r_email = 'Veuillez renseignez un mot de passe'
            }
            else if (email !== r_email) {
                formErreurs.r_email = "L'adresse mail ne coresspond pas"
            }
            else {
                formErreurs.r_email = ''
            }
            isValidated.r_email = setValidate(formErreurs.r_email)
        }


        isValidated.email = setValidate(formErreurs.email)
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

        console.log(this.state)

        this.setState({ [name]: value })
    };

    handleReset = (e) => {
        e.preventDefault()
        this.setState(this.initailState)
        console.log(this.state)
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
                            <p className={"h4"}>Adresse e-mail</p>
                            <FormGroup className="">
                                <p className={"font-weight-bold"}>Adresse e-mail actuelle:{this.state.email}</p>
                            </FormGroup>
                            <FormGroup >
                                <label>Nouvelle adresse e-mail </label>
                                <input
                                    type="email"
                                    className={`form-control ${this.state.isValidated.email}`} //class 
                                    placeholder="mail@provider.com"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}//un evenement
                                />
                                <span className="text-danger" >{this.state.formErreurs.email}</span>
                            </FormGroup>
                            <FormGroup >
                                <Label>Confirmer l'adresse e-mail </Label>
                                <input
                                    type="email"
                                    className={`form-control ${this.state.isValidated.r_email}`} //class 
                                    placeholder="mail@provider.com"
                                    name="r_email"
                                    value={this.state.r_email}
                                    onChange={this.handleChange}//un evenement
                                />
                                <span className="text-danger" >{this.state.formErreurs.r_email}</span>
                            </FormGroup>
                            <FormGroup>
                                <input
                                    type="submit"
                                    className="btn btn-orange btn-block"
                                    value="Modifier l'adresse e-mail"
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

export default ResetMail
