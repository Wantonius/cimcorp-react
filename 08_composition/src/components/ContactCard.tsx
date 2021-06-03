import React,{ReactChild} from 'react';

interface Props {
	children:ReactChild;
}

export default class ContactCard extends React.Component<Props> {
	
	render() {
			let cardStyle:React.CSSProperties = {
				backgroundColor:"lightgreen",
				height:200,
				width:150,
				textAlign:"center",
				margin:10
			}
			return (
				<div style={cardStyle}>
					{this.props.children}
				</div>
			)
		
	}
	
}