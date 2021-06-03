import React,{ReactChild} from 'react';

interface NamedChildren {
	header:ReactChild;
	media?:ReactChild;
	content:ReactChild;
}
export default class NamedChildrenCard extends React.Component<NamedChildren> {
	
	render() {
			let cardStyle:React.CSSProperties = {
				backgroundColor:"lightgreen",
				height:200,
				width:150,
				textAlign:"center",
				margin:10
			}		
		const {header,media,content} = this.props;
		return(
			<div style={cardStyle}>
				<div>{header}</div>
				{media? <div>{media}</div>:null}
				<div>{content}</div>
			</div>
		)
	}
	
}