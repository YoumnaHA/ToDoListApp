import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, FormGroup, Form, Button } from "reactstrap";
import { BrowserRouter as Router, Route, Switch, NavLink, withRouter } from "react-router-dom";
import axios from 'axios'
import Auth from '../auth/auth'


// import {isEmpty,isEmail} from './utils';

import { postData, getData, isEmpty, isEmail, setValidate } from '../../utils/utils';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErreurs: {
        email: "",
        password: ""
      },
      isValidated: {
        email: "",
        password: ""
      },
      messageErr: '',
      loading: false
    }
    this.initailState = this.state
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password, messageErr } = this.state

    this.setState({
      loading: true
    })

    if (this.handleForm(e)) {
      console.log(this.state)

      Auth.login(email, password)
        .then((data) => {
          // this.props.history.push("/")
          // window.location.reload()
          if (data.error) {
            this.setState({ messageErr: data.error })
            console.log(data.error)
          }
          else {
            console.log(data)
            console.log(Auth.getUser())
            window.location.reload()
          }
        })

    }

  }


  handleValidation = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorMgs = this.state.errorMgs
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
    else {
      formErreurs.password = ''
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

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target

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
                    className={`form-control ${this.state.isValidated.email}`} //class 
                    placeholder="mail@provider.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}//un evenement
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
                  <span className="text-danger" >{this.state.formErreurs.password}</span>
                </FormGroup>
                <div className="checkbox" style={{ display: "none" }}>
                  <label>Remember me</label>
                  <input type="checkbox" name="remember" />
                </div>
                <FormGroup className="pt-3">
                  <p className="text-danger text-center">{this.state.messageErr}</p>
                </FormGroup>
                <button type="submit" className="btn btn-orange btn-block">
                  Connexion
                </button>
                <div className="form-group pt-4 text-center">
                  <NavLink to="/passwordOublie" className="text-danger">J'ai oublié mon mot de passe</NavLink>
                </div>
                <div className="form-group text-center text-danger">
                  <NavLink to="/signup" className="text-danger">Pas encore de compte ? Inscrivez-vous !</NavLink>
                </div>

              </Form>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
