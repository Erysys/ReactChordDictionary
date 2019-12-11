import React, { Component } from 'react';
import Display from './Display.js';
import InputRow from './InputRow.js';

class Dictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            root: 'C',
            quality: 'Maj',
            chordSpelling: 'C E G'
        };
    }
    updateRoot(value) {
        this.setState({ root: value })
    };
    updateQuality(value) {
        this.setState({ quality: value })
    };
    updateSpelling(value) {
        this.setState({ chordSpelling: value });
    };

    render() {
        return <div className="dictionary container-fluid">
            <Display chordState={this.state} />
            <InputRow chordState={this.state}
                updateRoot={props => this.updateRoot(props)}
                updateQuality={this.updateQuality.bind(this)}
                updateSpelling={this.updateSpelling.bind(this)} />
        </div>
    };
}

export default Dictionary;