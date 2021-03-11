import React from 'react';

export class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: props.placeholder,
            style: props.style,
            name: props.name
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    this.setState({value: event.target.value});  }

    // handleSubmit(event) {
    //     alert(this.state.value);
    //     event.preventDefault();
    // }

    render() {
        return (
                <input type="text" placeholder={this.state.placeholder} name={this.state.name} style={this.state.style} value={this.state.value} onChange={this.handleChange} />
        );
    }
}