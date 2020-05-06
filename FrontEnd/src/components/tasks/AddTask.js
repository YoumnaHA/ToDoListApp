import React, { Component } from 'react'

export class AddTask extends Component {
    state = {
        titre: ''
    }
    handleChange = (e) => {
        this.setState({ titre: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addTask(this.state.titre)
        this.setState({ titre: '' })
    }
    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                    className='form-group row'
                >
                    <svg className='col-1' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#FF7675" />
                    </svg>
                    <input
                        className='form-control border-0 col'
                        type="text"
                        classtitre={" border-0"}
                        placeholder="Nouvelle tâche"
                        name="titre"
                        value={this.state.titre}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default AddTask
