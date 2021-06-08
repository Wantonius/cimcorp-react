import React from 'react';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {AppState} from '../types/states';

const mapStateToProps = (state:AppState) => {
	console.log("Navbar.tsx mapStateToProps");
	let error:string = "";
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error;
	}
	return {
		loading:state.login.loading,
		error:error,
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class Navbar extends React.Component<PropsFromRedux> {

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

export default connector(Navbar);