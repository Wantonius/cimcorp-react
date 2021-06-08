import * as actionConstants from '../types/actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

interface Token {
	token:string;
}

//LOGIN API
//ASYNC ACTION CREATORS

export const register = (username:string,password:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		console.log("Async action:register. User:"+username);
		const request:Request = new Request("/register",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		handleLogin(request,"register",dispatch);
	}
}


export const login = (username:string,password:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		console.log("Async action:login. User:"+username);
		const request:Request = new Request("/login",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		handleLogin(request,"login",dispatch);
	}	
}
	
const handleLogin = async (request:Request,act:string, dispatch:ThunkDispatch<any,any,AnyAction>) => {
	    console.log("handleLogin:"+act);
		let loadingAction:AnyAction = {
			type:actionConstants.LOADING
		}
		dispatch(loadingAction);
		const response = await fetch(request);
		loadingAction.type = actionConstants.STOP_LOADING;
		dispatch(loadingAction);
		if(response.ok) {
			if(act === "register") {
				let action:AnyAction = {
					type:actionConstants.REGISTER_SUCCESS,
					error:"Register success!"
				}
				dispatch(action);
			}
			if(act === "login") {
				const temp = await response.json();
				let data = temp as Token;
				let action:AnyAction = {
					type:actionConstants.LOGIN_SUCCESS,
					token:data.token
				}
				dispatch(action);
			}
		} else {
			if(act === "register") {
				let action:AnyAction = {
					type:actionConstants.REGISTER_FAILED,
					error:"Register failed. Is username already in use?"
				}
				dispatch(action);
			}
			if(act === "login") {
				let action:AnyAction = {
					type:actionConstants.LOGIN_FAILED,
					error:"Login failed. Server responded with a status "+response.status
				}
				dispatch(action);
			}
		}
	}
		