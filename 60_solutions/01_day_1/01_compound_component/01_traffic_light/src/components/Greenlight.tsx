import React from 'react';

interface Props {
	color:string;
}

export default class Greenlight extends React.Component<Props> {

	render() {
		let style = {
			backgroundColor:"white",
			marginTop:10,
			marginLeft:10,
			height:200,
			width:200
		}
		if(this.props.color === "green") {
			style.backgroundColor="green";
		}
		return (
			<div style={style}></div>
		)
		
	
	}
}