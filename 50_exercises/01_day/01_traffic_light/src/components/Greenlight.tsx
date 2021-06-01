import React from 'react';

interface Props {
	color:string;
}

export default class Greenlight extends React.Component<Props> {

	render() {
		let style:React.CSSProperties = {
			backgroundColor:"white",
			marginTop:10,
			marginLeft:10,
			height:200,
			width:200
		}
		//TODO Set the background color to "green" in proper time
		return (
			<div style={style}></div>
		)
		
	
	}
}