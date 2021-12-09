import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './components/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';


interface State {
	list:ShoppingItem[],
	id:number
}


function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	});
	
	//TODO: Tuo useLocale hookilla changeLoc funktio App-komponenttiin ja kiinnitä se sopivasti en ja fi nappeihin

	
	const addToList = (item:ShoppingItem) => {
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeFromList = (id:number) => {
		setState((state) => {
			let tempList:ShoppingItem[] = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	
	return (
		<div className="App">
			<div>
				<button onClick={// TODO: Tähän funktiokutsu }>En</button>
				<button onClick={// TODO: Tähän funktiokutsu }>Fi</button>
			</div>
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
