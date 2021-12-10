import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import ShoppingItem from '../models/ShoppingItem';

interface State {
	list:ShoppingItem[],
	isLogged:boolean,
	loading:boolean,
	token:string,
	error:string
}

const initialState:State = {
	list:[],
	isLogged:false,
	loading:false,
	token:"",
	error:""
}

interface Action {
	type:string,
	payload:any
}

const listReducer = (state:State,action:Action) => {
	switch(action.type) {
		default:
			return state;
	}
}

const StateProvider:React.FC<{}> = (props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateProvider;