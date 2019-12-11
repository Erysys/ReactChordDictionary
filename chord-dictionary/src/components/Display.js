import React, { Component } from 'react';

class Display extends Component {
    render() {
        return <div className="d-flex justify-content-center row">
            <div className="jumbotron text-center chord-display col-8 mt-2">
                <h1 className="chord-name" onChange={this.updateDisplay}>{this.props.chordState.root} {this.props.chordState.quality}</h1>
                <p>{this.props.chordState.chordSpelling}</p>
            </div>
        </div>
    }
}

export default Display;