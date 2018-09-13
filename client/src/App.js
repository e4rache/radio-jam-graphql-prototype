import React, { Component } from 'react';
import graphqlRequest from './components/graphqlRequest'

import Radios from './components/radios'
import RadioEdit from './components/radioEdit'

class App extends Component {

  state = {
    radios: [],
    tubes: [],
    radioToEdit: null
  }

  editRadio = (radioToEdit) => {
    this.setState({ radioToEdit })
  }

  updateRadioToEdit = () => {

    if (this.state.radios && this.state.radioToEdit) {

      const radioToEdit =
        this.state.radios.find(radio => radio.id === this.state.radioToEdit.id)

      this.setState({ radioToEdit })
    }
  }

  getRadios = () => {

    graphqlRequest(
      `
        { 
          radios {
            id
            brand
            model 
            serialNumber
            description
            tubes { 
              linkId
              quantity
              tube {id model}
              radio { id }
            }
          } 
        }
      `
    )
      .then(result => {
        this.setState({ radios: result.radios })
        this.updateRadioToEdit()
      })
  }

  getTubes = () => {
    graphqlRequest(
      `
        { 
          tubes {
            id
            model
            radios {
              linkId
              quantity
              tube {
                model
              }
            }
          }
        }
        `)
      .then(result => this.setState({ tubes: result.tubes }))
  }

  addTubeToRadio = async ({ radioId, tubeId }) => {


    console.log(
      '----------App.addTubeToRadio ------------------------')
    console.log(' radioId ', radioId)
    console.log('  tubeId ', tubeId)
    console.log('------------------------------------------')
    const AddTubeToRadio = `
        mutation addTubeToRadio( $tubeId: ID!, $radioId: ID!) {
            addTubeToRadio(radioId: $radioId, tubeId: $tubeId)
        }
    `
    const result = await graphqlRequest(
      AddTubeToRadio,
      { tubeId, radioId }
    )

    this.getRadios()
  }

  removeTubeFromRadio = async ({ radioId, tubeId }) => {

    const RemoveTubeFromRadio = `
      mutation removeTubeFromRadio( $tubeId: ID!, $radioId: ID!) {
        removeTubeFromRadio(radioId: $radioId, tubeId: $tubeId)
      }
    `
    const result = await graphqlRequest(
      RemoveTubeFromRadio,
      { tubeId, radioId }
    )

    this.getRadios()
  }


  componentDidMount = () => {
    this.getRadios()
    this.getTubes()
  }

  render = () => {

    return (
      <div>
        <Radios
          editRadio={this.editRadio}
          radioToEdit={this.state.radioToEdit}
          radios={this.state.radios}
        />

        <div className='spacer' />

        <RadioEdit
          radioToEdit={this.state.radioToEdit}
          tubeList={this.state.tubes}
          addTubeToRadio={this.addTubeToRadio}
          removeTubeFromRadio={this.removeTubeFromRadio}
        />
      </div>
    )
  }
}

export default App;
