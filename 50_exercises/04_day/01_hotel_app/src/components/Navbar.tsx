import React from 'react';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import HotelInfo from '../models/HotelInfo';

interface State {
	list:HotelInfo[];
	loading:boolean;
	error:string;
}

//TODO create mapStateToProps with loading and error

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class Navbar extends React.Component<PropsFromRedux>{
	
	render() {
		let header = <h4>Hotel app</h4>
		if(this.props.loading) {
			header = <h4>Loading ...</h4>
		}
		if(this.props.error) {
			header = <h4>{this.props.error}</h4>
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
}

export default connector(Navbar);