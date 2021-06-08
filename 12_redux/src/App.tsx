import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {AppState} from './types/states';

const mapStateToProps = (state:AppState) => {
	console.log("App.tsx mapStateToProps");
	return {
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
	
	render() {
		return (
			<div className="App">
				<Navbar />
				<hr/>
				<Switch>
					<Route exact path="/" render={() => 
					this.props.isLogged ? 
					(<Redirect to="/list"/>) : 
					(<LoginPage  />)
					}/>
					<Route path="/list" render={() => this.props.isLogged ? (
						<ShoppingList/>	
					): 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.props.isLogged? (
						<ShoppingForm/>
					):
					(<Redirect to="/"/>)
					}/>
					<Route render={() => this.props.isLogged ?
					(<Redirect to="/list"/>) :
					(<Redirect to="/"/>)}/>
				</Switch>				
			</div>
		);
	}
}

export default connector(App);
