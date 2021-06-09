import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './ShoppingItem';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import {useAction} from './hooks/useaction';


function App() {
	
	const [list,loading,addToList,removeFromList] = useAction()
	
	let header = <h4>Shopping app</h4>
	if(loading) {
		header = <h4>Loading...</h4>
	}
	
	return (
		<div className="App">
			{header}
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
