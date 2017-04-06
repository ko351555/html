import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import Sample from './sample.jsx';
export default class Sample2 extends React.Component {


	handleChild (event) {
		this.props.val( event.target.value);
	}
	render () {
		return (

			<div>
			<h1>Hello Child</h1>
			<TextField floatingLabelText="Name"  value={this.props.name}/>
			<br/>
			<TextField floatingLabelText="child" onChange={this.handleChild.bind(this)}/>
			</div>

			);
	}
}//end of class