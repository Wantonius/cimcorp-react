import * as actionConstants from '../actions/actionConstants';
import {HotelState} from './stateTypes';
import {AnyAction} from 'redux';

const initialState:HotelState = {
	loading:false,
	list:[],
	error:""
}

const loginReducer = (state:HotelState = initialState, action:AnyAction): HotelState => {
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
				loading:false,
				error:""
			}
		case actionConstants.FETCH_HOTELS_SUCCESS:
			return {
				list:action.list,
				loading:false,
				error:""
			}
		case actionConstants.FETCH_HOTELS_FAILED:
			return {
				...state,
				loading:false,
				error:action.error
			}		
		case actionConstants.ADD_HOTEL_SUCCESS:
			return {
				...state,
				loading:false,
				error:""
			}
		case actionConstants.ADD_HOTEL_FAILED:
			return {
				...state,
				loading:false,
				error:action.error
			}
		case actionConstants.REMOVE_HOTEL_SUCCESS:
			return {
				...state,
				loading:false,
				error:""
			}
		case actionConstants.REMOVE_HOTEL_FAILED:
			return {
				...state,
				loading:false,
				error:action.error
			}
		case actionConstants.EDIT_HOTEL_SUCCESS:
			return {
				...state,
				loading:false,
				error:""
			}
		case actionConstants.EDIT_HOTEL_FAILED:
			return {
				...state,
				loading:false,
				error:action.error
			}
		default:
			return state;
	}
}

export default loginReducer;