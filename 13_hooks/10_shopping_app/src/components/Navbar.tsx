import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppState} from '../types/states';

interface State {
	login:{
		isLogged:boolean,
		error:string,
		loading:boolean
	},
	shopping:{
		error:string
	}
}

const Navbar:React.FC<{}> = () =>  {

	const tempState = (state:State) => state

	const state = useSelector(tempState);
	
	let navStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:120
	}
	let header = <h4>Shopping App</h4>
	if(state.login.loading) {
		header = <h4>Shopping App ...loading</h4>
	}
	let error = "";
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error
	}
	if(error) {
		header = <h4>{error}</h4>
	}
	if(state.login.isLogged) {
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


export default Navbar;