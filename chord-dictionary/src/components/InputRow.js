import React, { Component, createClass } from 'react';

const rootArray = [
    { value: "C", display: "C" },
    { value: "D", display: "D" },
    { value: "E", display: "E" },
    { value: "F", display: "F" },
    { value: "G", display: "G" },
    { value: "A", display: "A" },
    { value: "B", display: "B" }
]

const qualityArray = [
    { value: "Maj", display: "Major" },
    { value: "min", display: "minor" },
    { value: "Aug", display: "Augmented" },
    { value: "dim", display: "diminished" },
    { value: "sus2", display: "suspended 2nd" },
    { value: "sus4", display: "suspended 4th" },
    { value: "Maj7", display: "Major 7th" },
    { value: "min7", display: "minor 7th" },
    { value: "Maj7♯5", display: "Augmented 7th" },
    { value: "7", display: "Dominant 7th" },
    { value: "dim7", display: "diminished 7th" },
    { value: "min7♭5", display: "Half-diminished 7th" }
]

const noteArraySharp = [
    "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"
]

const noteArrayFlat = [
    "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"
]

const chordFormulas = [
    { key: "Maj", value: [0, 4, 7] },
    { key: "min", value: [0, 3, 7] },
    { key: "Aug", value: [0, 4, 8] },
    { key: "dim", value: [0, 3, 6] },
    { key: "sus2", value: [0, 2, 7] },
    { key: "sus4", value: [0, 5, 7] },
    { key: "Maj7", value: [0, 4, 7, 11] },
    { key: "min7", value: [0, 3, 7, 10] },
    { key: "Maj7♯5", value: [0, 4, 8, 11] },
    { key: "7", value: [0, 4, 7, 10] },
    { key: "dim7", value: [0, 3, 6, 9] },
    { key: "min7♭5", value: [0, 3, 6, 10] }
]

class InputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootInput: 'C',
            root: 'C',
            isFlat: false,
            accidental: 'natural',
            accidentalSymbol: '',
            qualityInput: 'Maj'
        }
        this.handleSubmitValidation = this.handleSubmitValidation.bind(this);
    }
    handleAccidentalChange(event) {
        this.setState({ accidental: event.target.value });
        if (event.target.value === 'sharp') {
            this.setState({
                accidentalSymbol: '♯',
                isFlat: false
            });
        }
        else if (event.target.value === 'flat') {
            this.setState({
                accidentalSymbol: '♭',
                isFlat: true
            });
        }
        else {
            this.setState({
                accidentalSymbol: '',
                isFlat: false
            });
        }
    }
    handleSubmitValidation() {
        if (this.state.rootInput === 'C' && this.state.accidental === 'flat') {
            this.setState({
                rootInput: 'B',
                accidental: 'natural',
                accidentalSymbol: '',
                isFlat: false
            }, this.handleSubmit);
        }
        else if (this.state.rootInput === 'F' && this.state.accidental === 'flat') {
            this.setState({
                rootInput: 'E',
                accidental: 'natural',
                accidentalSymbol: '',
                isFlat: false
            }, this.handleSubmit);
        }
        else if (this.state.rootInput === 'B' && this.state.accidental === 'sharp') {
            this.setState({
                rootInput: 'C',
                accidental: 'natural',
                accidentalSymbol: '',
                isFlat: false
            }, this.handleSubmit);
        }
        else if (this.state.rootInput === 'E' && this.state.accidental === 'sharp') {
            this.setState({
                rootInput: 'F',
                accidental: 'natural',
                accidentalSymbol: '',
                isFlat: false
            }, this.handleSubmit);
        }
        else {
            this.handleSubmit();
        }
    }
    handleSubmit() {
        const newRoot = this.state.rootInput + this.state.accidentalSymbol;
        this.setState({ root: newRoot }, this.handleSpelling)
        this.props.updateRoot(newRoot);
        this.props.updateQuality(this.state.qualityInput)
    }
    handleSpelling() {
        let noteArray = [];
        if (this.state.isFlat === false) {
            noteArray = noteArraySharp;
        }
        else {
            noteArray = noteArrayFlat;
        }
        let chordString = '';
        let formulaIndex = chordFormulas.findIndex(note => note.key === this.state.qualityInput);
        let rootIndex = noteArray.findIndex(note => note === this.state.root);
        for (let i = 0; i < chordFormulas[formulaIndex].value.length; i++) {
            chordString += noteArray[(rootIndex + chordFormulas[formulaIndex].value[i]) % 12] + ' ';
        }

        this.props.updateSpelling(chordString);
    }
    render() {
        return <form className="form-row d-flex justify-content-center row my-4">
            <div className="form-element">
                <label htmlFor="rootInput">Root: </label>
                <select name="rootInput" value={this.state.rootInput}
                    onChange={(event) => this.setState({ rootInput: event.target.value })}>
                    {rootArray.map((note) =>
                        <option key={note.value} value={note.value}>{note.display}</option>
                    )}
                </select>
            </div>
            <div className="form-element">
                <label>
                    <input type="radio" value="natural" checked={this.state.accidental === 'natural'}
                        onChange={this.handleAccidentalChange.bind(this)} />
                    ♮
            </label>
                <label>
                    <input type="radio" value="sharp" checked={this.state.accidental === 'sharp'}
                        onChange={this.handleAccidentalChange.bind(this)} />
                    ♯
            </label>
                <label>
                    <input type="radio" value="flat" checked={this.state.accidental === 'flat'}
                        onChange={this.handleAccidentalChange.bind(this)} />
                    ♭
            </label>
            </div>
            <div className="form-element">
                <label htmlFor="qualityInput">Quality: </label>
                <select name="qualityInput" value={this.state.qualityInput}
                    onChange={(event) => this.setState({ qualityInput: event.target.value })}>
                    {qualityArray.map((quality) =>
                        <option key={quality.value} value={quality.value}>{quality.display}</option>
                    )}
                </select>
            </div>
            <div className="form-element">
                <input type="button" className="btn btn-primary" name="go-button" value="Go!" onClick={this.handleSubmitValidation} />
            </div>
        </form>
    }
}

export default InputRow;