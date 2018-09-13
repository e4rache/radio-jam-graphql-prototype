import React, { Component } from 'react';

import TubesInRadio from './tubesInRadio'

class RadioEdit extends Component {
    state = {}

    render() {
        console.log('RadioEdit.render() radioToEdit', this.props.radioToEdit)

        const radio = this.props.radioToEdit

        if (!radio) {
            return 'click on edit'
        } else {
            return (

                <div>
                    <div>
                        <span className='radioPropertyName'>Brand : </span>
                        <span className='radioPropertyValue'>{radio.brand}</span>
                    </div>
                    <div>
                        <span className='radioPropertyName'>
                            Model :
                        </span>
                        <span className='radioPropertyValue'>
                            {radio.model}
                        </span>
                    </div>
                    <div>
                        <span className='radioPropertyName'>
                            Serial :
                        </span>
                        <span className='radioPropertyValue'>
                            {radio.serialNumber}
                        </span>
                    </div>
                    <div>
                        <span className='radioPropertyName'>
                            description :
                        </span>
                        <span className='radioPropertyValue'>           {radio.description}
                        </span>
                    </div>
                    <div>
                        <span className='radioPropertyValue'>
                            {radio.id}
                        </span>
                    </div>

                    <div className='spacer' />

                    <TubesInRadio
                        radioId={radio.id}
                        tubesInRadio={radio.tubes}
                        tubeList={this.props.tubeList}
                        addTubeToRadio={this.props.addTubeToRadio}
                        removeTubeFromRadio={this.props.removeTubeFromRadio}
                    />

                </div>
            );
        }
    }
}

export default RadioEdit;