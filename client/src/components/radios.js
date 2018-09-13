import React, { Component } from 'react';

class Radios extends Component {

    displayRadiosAsTableRows = () =>
        this.props.radios.map(radio =>
            <tr key={radio.id} className='radio'>
                <td className='brand'>{radio.brand}</td>
                <td className='model'>{radio.model}</td>
                <td className='serialNumber'>{radio.serialNumber}</td>
                <td>
                    <button onClick={e => this.props.editRadio(radio)}>edit</button>
                </td>
                <td>
                    {radio.id}
                </td>
            </tr>)

    render() {
        console.log('Radios.render() radios ', this.props.radios)
        return (
            <table className='radios'>
                <tbody>
                    <tr>
                        <th scope='col'>Brand</th>
                        <th scope='col'>Model</th>
                        <th scope='col'>Serial Number</th>
                    </tr>
                    {this.displayRadiosAsTableRows()}
                </tbody>
            </table>
        );
    }
}

export default Radios;
