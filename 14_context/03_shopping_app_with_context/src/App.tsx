import React,{useEffect} from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import {Routes,Route} from 'react-router-dom';
import useAction from './hooks/useAction';
import useAppState from './hooks/useAppState';
function App() {
	
	const {token,isLogged} = useAppState();
	const {getList} = useAction();
	
	useEffect(() => {
		if(isLogged) {
			getList(token);
		}
	},[isLogged])
	if(isLogged) {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/list" element={<ShoppingList/>}/>
					<Route path="/form" element={<ShoppingForm/>}/>
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/" element={<LoginPage/>}/>
				</Routes>
			</div>
		);		
	}
}

export default App;
