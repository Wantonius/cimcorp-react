import React from 'react';
import {Link} from 'react-router-dom';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';

const Navbar:React.FC<{}> = () => {
	
	const {logout} = useAction();
	const {isLogged,token,error,loading} = useAppState();
	
	const navStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:120
	}
	
	let header = <h4>Shopping App with Context</h4>
	if(loading) {
		header = <h4>Loading ...</h4>
	}
	if(error) {
		header = <h4>{error}</h4>
	}
	if(isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/list">Shopping list</Link></li>
					<li><Link to="/form">Add to list</Link></li>
					<li><Link to="/" onClick={() => logout(token)}>Logout</Link></li>
				</ul>
			</div>
		)
	} else {
		return (
			<div style={navStyle}>
				{header}
			</div>
		)
	}
}

export default Navbar;