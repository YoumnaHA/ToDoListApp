import React, { Component } from 'react'
import { Container, Row, FormGroup, Form, Button } from "reactstrap";


export class AddListe extends Component {
    state = {
        name: ''
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addListe(this.state.name)
        this.setState({ name: '' })
    }
    render() {
        return (
            <div>
                <Form 
                    onSubmit={this.handleSubmit}
                >
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#FF7675" />
                    </svg>
                    <input
                        type="text"
                        className={" border-0"}
                        placeholder="Nouvelle liste"
                        name="titre"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </Form>
            </div>
        )
    }
}

export default AddListe
