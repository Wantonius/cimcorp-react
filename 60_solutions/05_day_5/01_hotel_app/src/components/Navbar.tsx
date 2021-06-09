import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import HotelInfo from '../models/HotelInfo';

interface LoadingState {
	loading:boolean;
}

interface ErrorState {
	error:string
}

const Navbar:React.FC<{}> = () => {
	 
	const loadingState = (state:LoadingState) => state.loading
	const errorState = (state:ErrorState) => state.error
	
	const loading = useSelector(loadingState);
	const error = useSelector(errorState);
			
	let header = <h4>Hotel app</h4>
	if(loading) {
		header = <h4>Loading ...</h4>
	}
	if(error) {
		header = <h4>{error}</h4>
	}
	let navStyle={backgroundColor:"lightblue",height:120}
	return(
		<div style={navStyle}>
			{header}
			<ul style={{listStyleType:"none"}}>
				<li><Link to="/">Hotel List</Link></li>
				<li><Link to="/form">Add to list</Link></li>
			</ul>	
		</div>
	)
	
}

export default Navbar;