import React from 'react';
interface Props {
	value:number;
}

export default class Die extends React.Component<Props> {

	render() {
		let die_style:React.CSSProperties = {
			height:100,
			width:100,
			backgroundColor:"lightgreen",
			margin:"auto"
		}
		let text_style:React.CSSProperties = {
			fontSize:60,
			textAlign:"center",
			marginTop:10,
			padding:5
		}
		return(
			<div style={die_style}>
				<p style={text_style}>{this.props.value}</p>
			</div>
		)
	}
}