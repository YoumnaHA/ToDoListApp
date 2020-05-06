import React, { Component } from 'react'
import { Container, Row, FormGroup, Form, Button } from "reactstrap";

import { postData, getData, isEmpty, isEmail, setValidate, putData } from '../../utils/utils';


const APIURL = 'http://localhost:3001/user/reset/password'

export class PasswordOublie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            formErreurs: {
                email: ""
            },
            isValidated: {
                email: ""
            },
            message: ''
        }
        this.initailState = this.state
    }

    handleSubmit =  (e) => {
        e.preventDefault()
        const { email, message } = this.state


        if (this.handleForm(e)) {

            putData(APIURL, {
                email
            }).then(
                (data)=>{
                    if (data.error) {
                        this.setState({ message:data.error })
                    }
                    else {
                        this.handleReset(e)
                        this.setState({ message:data.message })
                    }
                }
            )
        }
    }


    handleValidation = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let message = this.state.message
        const { formErreurs, isValidated, email } = this.state

        if (isEmpty(email)) {
            formErreurs.email = "Veuillez renseigner une adresse e-mail"
        }
        else if (!isEmail(email)) {
            formErreurs.email = "Veuillez saisir une adresse mail valide";
        }
        else {
            formErreurs.email = "";
        }

        isValidated.email = setValidate(formErreurs.email)
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
        const { name, value } = e.target
        this.setState({ [name]: value })
    };

    handleReset = (e) => {
        e.preventDefault()
        this.setState(this.initailState)
    }

    render() {
        return (
            <React.Fragment>
                <Row className="container">
                    <div className="col-sm col-md-6 col-lg-4">
                        <Form
                            onSubmit={this.handleSubmit}
                            noValidate
                        >
                            <FormGroup >
                                <label>Adresse e-mail </label>
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
                            <FormGroup>
                                <input
                                    type="submit"
                                    className="btn btn-orange btn-block"
                                    value="Envoyer"
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

export default PasswordOublie
