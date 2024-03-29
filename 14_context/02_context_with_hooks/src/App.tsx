import React,{useState} from 'react';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import useTheme from './hooks/useTheme'
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

interface State {
	list:ShoppingItem[],
	id:number
}

function App() {
	
	const theme = useTheme();
	
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
			let tempList:ShoppingItem[] = state.list.filter(item => item.id !==id)
			return {
				...state,
				list:tempList
			}
		})
	}
	
	const toggleTheme = () => {
		if(theme) {
			theme.toggleTheme();
		}
	}
	
	return (
		<div className="App">
			<button style={{
				color:theme.color,
				backgroundColor:theme.backgroundColor
			}} onClick={toggleTheme}>Toggle Theme</button>
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
