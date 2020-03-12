import React, { Component } from 'react';
import axios from 'axios';


class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const indexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: indexes.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {index: this.state.index});
        this.setState({ index: '' });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes
                         .map( ({FIB_INDEX}) => FIB_INDEX )
                         .join(', ');
    }

    rendercaclulatedVaules() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} the Caclulated Fib is {this.state.values[key]}
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <label>Enter your index</label>
                        <input value = {this.state.index}
                               onChange = {event => this.setState({ index: event.target.value })} />
                        <button>Submit</button>
                    </form>
                </div>
                <div>
                    <h3>Indexes I've Seen:</h3>
                    {this.renderSeenIndexes()}
                </div>
                <div>
                    <h3>Caclulated Values:</h3>
                    {this.rendercaclulatedVaules()}
                </div>
            </div>
        );
    }
}
