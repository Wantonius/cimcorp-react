import React,{useState} from 'react';
import './App.css';
import ShoppingItem from './components/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

/*
TODO: Lisää loggaus komentoja pitkin komponentteja käyttämällä useLog-hookkia.
Muista käynnistää backend hakemistosta server.js toisessa terminaalissa/komentokehotteessa käskyllä node server
Logit voi käydä lukemassa selaimella osoitteessa localhost:3001/hoclog

*/

interface State {
	list:ShoppingItem[],
	id:number
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	});
	

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
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
