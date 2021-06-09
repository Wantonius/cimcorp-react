import React,{useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './ShoppingItem';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

interface State {
	list:ShoppingItem[],
	id:number
}

const initialState:State = {
	list:[],
	id:100
}

type Action = {
	type:string,
	payload:any
}

const listReducer = (state:State,action:Action) => {
	switch(action.type) {
		case "ADD_TO_LIST":
			action.payload.id = state.id;			
			return {
				list:state.list.concat(action.payload as ShoppingItem),
				id:state.id+1
			}
		case "REMOVE_FROM_LIST":
			let tempList:ShoppingItem[] = state.list.filter(item => item.id !== action.payload as number);
			return {
				...state,
				list:tempList
			}			
		default:
			return state;
	}
}

function App() {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	const addToList = (item:ShoppingItem) => {
		dispatch({
			type:"ADD_TO_LIST",
			payload:item
		})
	}
	
	const removeFromList = (id:number) => {
		dispatch({
			type:"REMOVE_FROM_LIST",
			payload:id
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
