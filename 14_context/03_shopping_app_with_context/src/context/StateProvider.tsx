import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import ShoppingItem from '../models/ShoppingItem';
import * as actionConstants from '../types/actionConstants';

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
		case actionConstants.LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			return {
				...state,
				error:"Register success!"
			}
		case actionConstants.REGISTER_FAILED:
			return {
				...state,
				error:action.payload as string
			}
		case actionConstants.LOGIN_SUCCESS:
			return {
				...state,
				isLogged:true,
				error:"",
				token:action.payload as string
			}
		case actionConstants.LOGIN_FAILED:
			return {
				...state,
				error:action.payload as string
			}
		case actionConstants.LOGOUT_SUCCESS:
			return {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				error:""
			}
		case actionConstants.LOGOUT_FAILED:
			return {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				error:action.payload as string
			}
		case actionConstants.FETCH_LIST_SUCCESS:
			return {
				...state,
				list:action.payload as ShoppingItem[],
				error:""
			}
		case actionConstants.FETCH_LIST_FAILED:
			return {
				...state,
				error:action.payload as string
			}
		case actionConstants.ADD_NEW_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.ADD_NEW_ITEM_FAILED:
			return {
				...state,
				error:action.payload as string
			}
		case actionConstants.REMOVE_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.REMOVE_ITEM_FAILED:
			return {
				...state,
				error:action.payload as string
			}
		case actionConstants.EDIT_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.payload as string
			}
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