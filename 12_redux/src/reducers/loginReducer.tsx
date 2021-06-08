import * as actionConstants from '../types/actionConstants';
import {LoginState} from '../types/states';
import {AnyAction} from 'redux';

const initialState:LoginState = {
	loading:false,
	isLogged:false,
	token:"",
	error:""
}

const loginReducer = (state:LoginState = initialState, action:AnyAction):LoginState => {
	console.log("loginReducer:"+action.type);
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
				loading:false,
				error:"Register Success!"
			}
		case actionConstants.REGISTER_FAILED:
			return {
				...state,
				error:action.error,
				loading:false
			}
		case actionConstants.LOGIN_SUCCESS:
			return {
				loading:false,
				token:action.token,
				isLogged:true,
				error:""
			}
		case actionConstants.LOGIN_FAILED:
			return {
				...state,
				error:action.error,
				loading:false
			}
		case actionConstants.LOGOUT_SUCCESS:
			return {
				loading:false,
				isLogged:false,
				token:"",
				error:""
			}
		case actionConstants.LOGOUT_FAILED:
			return {
				loading:false,
				isLogged:false,
				token:"",
				error:action.error
			}		
		default:
			return state;
	}
}

export default loginReducer;

