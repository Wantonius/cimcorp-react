import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './ShoppingItem';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import LocalContext,{localizations,Localization} from './LocalContext';

interface State {
	list:ShoppingItem[],
	id:number
}

interface Location {
	lo:Localization
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	});
	
	//TODO luo tilamuuttuja tallentamaan nykyinen valittu lokaatio (en/fi)
	
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
	
	const changeLocation = (loc:string) => {
		//TODO: lokalisaatiomuuttujan muuttaminen valittuun lokaatioon
	}
	
	return (
	<LocalContext.Provider value={//TODO: Lisää tilamuuttuja joka säätelee lokaatiota tähän}>
		<div className="App">
			//TODO: lisää napit englannin ja suomen kielen vaihtamiseksi.
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	</LocalContext.Provider>
	);
}

export default App;
