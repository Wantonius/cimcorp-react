import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Switch,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppState} from './types/states';

interface LoginState {
	login:{
		isLogged:boolean;
	}
}


const App:React.FC<{}> = () =>  {
	
	const loginState = (state:LoginState) => state.login.isLogged

	const isLogged = useSelector(loginState);

	return (
		<div className="App">
			<Navbar />
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
				isLogged ? 
				(<Redirect to="/list"/>) : 
				(<LoginPage  />)
				}/>
				<Route path="/list" render={() => isLogged ? (
					<ShoppingList/>	
				): 
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() => isLogged? (
					<ShoppingForm/>
				):
				(<Redirect to="/"/>)
				}/>
				<Route render={() => isLogged ?
				(<Redirect to="/list"/>) :
				(<Redirect to="/"/>)}/>
			</Switch>				
		</div>
	);

}

export default App;
