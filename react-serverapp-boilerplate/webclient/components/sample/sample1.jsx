import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Sample2 from './sample2.jsx';
export default class Sample extends React.Component {
	constructor () {
		super();
		this.state = {
			name:' ',
			name2:' '    
		}
	}
	handlechange(name2)
	{
		this.setState({name2:name2});
		console.log(name2);
	}

	handleNameState (event) {
		this.setState({ name: event.target.value });
	}

	render () {
		return (
			<div>
			<h1>Hello </h1>
			<TextField floatingLabelText="Name" onChange={this.handleNameState.bind(this)} value={this.state.name}/>
			<br/>
			<TextField floatingLabelText="parent" value={this.state.name2} />
			<Sample2  name={this.state.name} 
			val={this.handlechange.bind(this)} />
			</div>
			);

	}
}//end of class

