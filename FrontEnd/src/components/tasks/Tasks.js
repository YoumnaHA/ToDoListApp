import React, { Component } from 'react'
import Task from './Task'
import AddTask from './AddTask'
import Steps from '../steps/Steps'
import AddStep from '../steps/AddStep'
import { deleteData, putData, getData, getUrl } from '../../utils/utils'

const APIURL = getUrl()


export class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentList: '',
            _taskId: '',
            _stepId: '',
            steps: [],
            count: 0

        }
    }
    componentDidMount() {
        this.setState({ currentList: this.props.currentList })
        // const urlStep = APIURL + 'steps/' + this.state._taskId +  this.state._userId+'&_listId='+this.state._listId;
        getData(APIURL + 'steps/' + this.state._taskId).then(
            (res) => {
                this.setState({
                    steps: res
                });

            }
        );
        // this.count()
    }

    deleteStep = (id_step) => {
        deleteData(APIURL + 'steps/delete/' + id_step) // ou ''steps/delete

            .then(json => {
                this.setState({
                    steps: this.state.steps.filter(step =>
                        id_step !== step.id_step
                    )
                })
            });
    }

    stepMarkComplete = async (id_step) => {
        this.setState({
            steps: this.state.steps.map(step => {
                if (step.id_step === id_step) {
                    step.done = !step.done
                }
                return step
            })
        })

        let [In] = this.state.steps.filter(step => id_step === step.id_step)

        let res = await putData(APIURL + 'steps/update' + id_step, In)
        const data = await res.json()
        console.log(data)

    }


    render() {
        let [name] = this.props.currentList.map((liste) => liste.name)
        return (
            <div className="content col-8">
                <h1>{name || 'Prochaines tâches'}</h1>
                {name&&
                    <input
                        className='btn btn-danger mb-3 float-right'
                        type='button'
                        value='Supprimer la liste'
                        onClick={this.props.deleteListe.bind(this)}
                    />
                }
                <ul className="list-group list-group-flush">
                    {this.props.tasks.map((task) => (
                        <Task
                            key={task._id}
                            task={task}
                            markComplete={this.props.markComplete}
                            deleteTask={this.props.deleteTask}
                        />
                    ))}
                    {name &&
                        <AddTask addTask={this.props.addTask} />
                    }



                    <Steps
                        steps={this.state.steps}
                        stepMarkComplete={this.stepMarkComplete}
                        deleteStep={this.deleteStep}
                    />
                    {
                      //  <AddStep addStep={this.addStep} />

                    }
                </ul>

            </div>
        )
    }
}

export default Tasks
