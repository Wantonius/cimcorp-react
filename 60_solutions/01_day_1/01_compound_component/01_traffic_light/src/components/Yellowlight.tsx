import React from 'react';

interface Props {
	color:string;
}

export default class Yellowlight extends React.Component<Props> {

	render() {
		let style = {
			backgroundColor:"white",
			marginTop:10,
			marginLeft:10,
			height:200,
			width:200
		}
		if(this.props.color === "yellow") {
			style.backgroundColor="yellow";
		}
		return (
			<div style={style}></div>
		)
		
	
	}
}