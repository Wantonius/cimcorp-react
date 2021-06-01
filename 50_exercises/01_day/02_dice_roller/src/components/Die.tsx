import React from 'react';
interface Props {
	value:number;
}

export default class Die extends React.Component<Props> {

	render() {
		let die_style:React.CSSProperties = {
			//TODO For fun, create the CSS properties for a dice
			//It is a box with backgroundColor and margins set to auto
		}
		let text_style:React.CSSProperties = {
			//TODO Try to set your text inside the dice large enough
			//and in the middle
		}
		return(
			<div style={die_style}>
				<p style={text_style}>{this.props.value}</p>
			</div>
		)
	}
}