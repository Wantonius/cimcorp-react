import React from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {

	render() {
		let navStyle:React.CSSProperties = {
			backgroundColor:"lightgreen",
			height:120
		}
		return(
			<div style={navStyle}>
				<h4>Shopping App</h4>
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/list">Shopping List</Link></li>
					<li><Link to="/form">Add to List</Link></li>
				</ul>
			</div>
		)		
	}
}