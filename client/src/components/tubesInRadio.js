import React, { Component } from 'react';

class TubesInRadio extends Component {

    onDecrement = (linkId) => {
        // gql fetch link
        // if link quantity === 1, gql remove link
    }

    onAddTube = (e) => {
        e.preventDefault()
        console.log('TubesInRadio.onAddTube e.target.radioId.value', e.target.radioId.value)
        console.log('TubesInRadio.onAddTube e.target.tubeSelect.value', e.target.tubeSelect.value)

        const radioId = e.target.radioId.value
        const tubeId = e.target.tubeSelect.value

        console.log('-----------------TubesInRadio.onAddTube------------------')
        console.log('radioId ', radioId)
        console.log(' tubeId ', tubeId)
        console.log('------------------------------------------')
        tubeId ?
            this.props.addTubeToRadio({ radioId, tubeId })
            : console.log('do nothing')

    }

    displayTubeSelect = () => {
        let tubes = this.props.tubeList.map(t =>
            ({
                model: t.model,
                id: t.id
            })).sort((a, b) => a.model.localeCompare(b.model))

        return (
            <div>
                <label htmlFor='tubeSelect'>Tube</label>
                <select id='tubeSelect' name='tubeSelect' defaultValue=''>
                    <option value=''>Please choose</option>
                    {tubes.map(tube =>
                        <option key={tube.id} value={tube.id}>{tube.model}</option>
                    )}
                </select>
            </div>)
    }

    render() {
        const tubesInRadio = this.props.tubesInRadio
        const radioId = this.props.radioId
        console.log('TubesInRadio.render() radioId', radioId)
        return (

            <div>
                {tubesInRadio.map(
                    tir =>
                        <div key={tir.linkId}>
                            <div>
                                {tir.tube.model} | {tir.tube.id} |
                                <br /> {tir.quantity}
                            </div>
                            <div>

                                <button onClick={e => this.props.removeTubeFromRadio({
                                    radioId: tir.radio.id,
                                    tubeId: tir.tube.id
                                })}
                                >-</button>

                                <button onClick={e => this.props.addTubeToRadio({
                                    radioId: tir.radio.id,
                                    tubeId: tir.tube.id
                                })}
                                >+</button>

                            </div>
                        </div>
                )}

                <div>
                    <form name='addTubeForm' onSubmit={this.onAddTube}>
                        <input hidden='true' name='radioId' defaultValue={radioId} />

                        {this.displayTubeSelect()}

                        <button
                            type='submit'>
                            Add Tube
                        </button>
                    </form>

                </div>
            </div>
        );
    }
}

export default TubesInRadio;