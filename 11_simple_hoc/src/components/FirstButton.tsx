import React from 'react';
import Decorator from './Decorator';

interface Props {
	callback(message:string):void;
	color?:string
}

class FirstButton extends React.Component<Props> {
	
	callback = (e:React.SyntheticEvent) => {
		this.props.callback("You pressed the first button");
	}
	
	render() {
		let buttonStyle:React.CSSProperties = {
			backgroundColor:this.props.color
		}
		return(
			<button style={buttonStyle} onClick={this.callback}>Click me!</button>
		)
	}
}

export default Decorator(FirstButton);