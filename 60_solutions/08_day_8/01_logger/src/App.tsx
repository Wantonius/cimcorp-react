import React,{useState} from 'react';
import './App.css';
import ShoppingItem from './components/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import useLog from './hooks/useLog';

interface State {
	list:ShoppingItem[],
	id:number
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	});
	
	const log = useLog();
	const addToList = (item:ShoppingItem) => {
		log.info("addToList","Adding item:"+item.type)
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeFromList = (id:number) => {
		log.info("removeFromlist","Removing item with id:"+id)
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
