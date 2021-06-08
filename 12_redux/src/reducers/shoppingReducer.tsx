import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';
import {ShoppingState} from '../types/states';
import {AnyAction,Reducer} from 'redux';


const initialState:ShoppingState = {
	list:[],
	error:""
}

const shoppingReducer:Reducer<ShoppingState,AnyAction> = (state:ShoppingState = initialState,action:AnyAction):ShoppingState => {
	console.log("ShoppingReducer: action:"+action.type);
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				error:""
			}
		case actionConstants.FETCH_LIST_SUCCESS:
			return {
				list:action.list,
				error:""
			}
		case actionConstants.FETCH_LIST_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.ADD_NEW_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.ADD_NEW_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.REMOVE_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.REMOVE_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.EDIT_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		default:
			return state;
	}
}

export default shoppingReducer;