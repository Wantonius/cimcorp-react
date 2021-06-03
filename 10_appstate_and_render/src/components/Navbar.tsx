import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
	isLogged:boolean;
	error:string;
	loading:boolean;
}

export default class Navbar extends React.Component<Props> {

	render() {
		let navStyle:React.CSSProperties = {
			backgroundColor:"lightgreen",
			height:120
		}
		let header = <h4>Shopping App</h4>
		if(this.props.loading) {
			header = <h4>Shopping App ...loading</h4>
		}
		if(this.props.error) {
			header = <h4>{this.props.error}</h4>
		}
		if(this.props.isLogged) {
			return(
				<div style={navStyle}>
					<h4>{header}</h4>
					<ul style={{listStyleType:"none"}}>
						<li><Link to="/list">Shopping List</Link></li>
						<li><Link to="/form">Add to List</Link></li>
					</ul>
				</div>
			)		
		} else {
			return(
				<div style={navStyle}>
					<h4>{header}</h4>
				</div>
			)
		}
	}
}