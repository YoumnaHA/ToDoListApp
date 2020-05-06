import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, FormGroup, Form, Button } from "reactstrap";

import ProgressBarStrength from "./ProgressBarStrength";
import Auth from '../auth/auth'

import { postData, getData, isEmpty, isEmail, setValidate } from '../../utils/utils';

const APIURL = 'http://localhost:3001/user/signup/'

class Signup extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      r_password: '',
      formErreurs: {
        email: "",
        password: "",
        r_password: ''
      },
      display: "none",//faut effacer
      isValidated: {
        email: "",
        password: "",
        r_password: ''
      },
      message: ''
    }
    this.initailState = this.state
  }



  handleProgressBar = (e) => {
    let display = this.state.display
    if (display === 'none') {
      display = 'block'   // {  disply: none}
    }
    else {
      display = 'none'
    }
    this.setState({ display })
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    this.setState({ [name]: value })
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    let { email, password, token, user_id, message, formErreurs } = this.state


    if (this.handleForm(e)) {

      const res = await postData(APIURL, {
        email,
        password
      })
      const data = await res.json()
      if (data.error) {
        formErreurs.email = data.error
        this.setState({ formErreurs })
      }
      else {

        message = data.message
        this.setState({ message })
        window.location.replace('/')
      }
    }
  }

  handleReset = (e) => {
    e.preventDefault()
    this.setState(this.initailState)
    console.log(this.state)
  }


  handleValidation = (e) => {
    e.preventDefault();
    const { formErreurs, isValidated, email, password, r_password } = this.state


    if (isEmpty(email)) {
      formErreurs.email = "Veuillez renseigner une adresse e-mail"
    }
    else if (!isEmail(email)) {
      formErreurs.email = "Veuillez saisir une adresse mail valide";
    }
    else {
      formErreurs.email = "";
    }

    if (isEmpty(password)) {
      formErreurs.password = 'Veuillez renseignez un mot de passe'
    }
    else if (password.length < 4) {
      formErreurs.password = 'Votre mot de passe doit contenir au moins 6 caractères. Veuillez en essayer un autre.'
    }
    else {
      formErreurs.password = ''
      if (isEmpty(r_password)) {
        formErreurs.r_password = 'Veuillez répeter le mot de passe'
      }
      else if (r_password !== password) {
        formErreurs.r_password = 'Le mot de passe ne correspond pas'
      }
      else {
        formErreurs.r_password = ''
      }
      isValidated.r_password = setValidate(formErreurs.r_password)
    }

    isValidated.email = setValidate(formErreurs.email)
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

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className=" justify-content-center py-5 my-5">
            <div className="col-sm col-md-6 col-lg-4">
              <Form
                onSubmit={this.handleSubmit}
                noValidate
              >
                <FormGroup >
                  <label>Adresse e-mail </label>
                  <input
                    type="email"
                    className={`form-control ${this.state.isValidated.email}`}
                    placeholder="mail@provider.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <span className="text-danger" >{this.state.formErreurs.email}</span>
                </FormGroup>

                <FormGroup >
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    className={'form-control ' + this.state.isValidated.password}
                    id="password"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onFocus={this.handleProgressBar}
                    onBlur={this.handleProgressBar}
                  />
                  <ProgressBarStrength value={this.state.password} display={this.state.display} />
                  <span className="text-danger" >{this.state.formErreurs.password}</span>
                </FormGroup>
                <FormGroup >
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    className={'form-control ' + this.state.isValidated.r_password}
                    id="password"
                    placeholder="password"
                    name="r_password"
                    value={this.state.r_password}
                    onChange={this.handleChange}
                  />
                  <span className="text-danger" >{this.state.formErreurs.r_password}</span>
                </FormGroup>

                <button type="submit" className="btn btn-orange btn-block">
                  Inscription
                </button>
                <FormGroup className="pt-3">
                  <p className="text-success text-center">{this.state.message}</p>
                </FormGroup>
              </Form>
            </div>
          </Row>
        </Container>
      </React.Fragment>



    );
  }
}


export default Signup;
