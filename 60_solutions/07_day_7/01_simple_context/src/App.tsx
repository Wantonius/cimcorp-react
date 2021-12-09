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
	
	const [loc,setLoc] = useState<Location>({
		lo:localizations.en
	})
	
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
		if(loc === "en") {
			setLoc({
				lo:localizations.en
			})
		} else {
			setLoc({
				lo:localizations.fi
			})			
		}
	}
	
	return (
	<LocalContext.Provider value={loc.lo}>
		<div className="App">
			<div>
				<button onClick={() => changeLocation("en")}>En</button>
				<button onClick={() => changeLocation("fi")}>Fi</button>
			</div>
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	</LocalContext.Provider>
	);
}

export default App;
