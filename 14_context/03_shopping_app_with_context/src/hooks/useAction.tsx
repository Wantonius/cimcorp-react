import {useContext,useEffect,useState} from 'react';
import ActionContext from '../context/ActionContext';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';

interface State {
	url:string,
	request:{},
	action:string
}

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState<State>({
		url:"",
		request:{},
		action:""
	})
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(state.url,state.request);
			action.dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						action.dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							payload:data.token
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						const list = await response.json();
						action.dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							payload:list
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_NEW_ITEM_SUCCESS
						})
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						return;
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							action.dispatch({
								type:actionConstants.REGISTER_FAILED,
								payload:"Username already in use"
							})
							return;
						}
						action.dispatch({
							type:actionConstants.REGISTER_FAILED,
							payload:"Server responded with a status "+response.status
						})
						return;
					case "login":
						action.dispatch({
							type:actionConstants.LOGIN_FAILED,
							payload:"Server responded with a status "+response.status
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_FAILED,
							payload:"Failed to remove session info. Logging you out!"
						})
						return;
					case "getlist":
						if(response.status === 403) {}
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})						
							action.dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								payload:"Session has expired. Login again."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							payload:"Server responded with a status "+response.status
						})						
						return;
					case "additem":
						if(response.status === 403) {}
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})						
							action.dispatch({
								type:actionConstants.ADD_NEW_ITEM_FAILED,
								payload:"Session has expired. Login again."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.ADD_NEW_ITEM_FAILED,
							payload:"Server responded with a status "+response.status
						})						
						return;
					case "removeitem":
						if(response.status === 403) {}
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})						
							action.dispatch({
								type:actionConstants.REMOVE_ITEM_FAILED,
								payload:"Session has expired. Login again."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							payload:"Server responded with a status "+response.status
						})						
						return;
					case "edititem":
						if(response.status === 403) {}
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})						
							action.dispatch({
								type:actionConstants.EDIT_ITEM_FAILED,
								payload:"Session has expired. Login again."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							payload:"Server responded with a status "+response.status
						})						
						return;
					default:
						return;
				}				
			}
		}
		
		fetchData();
	},[state])
	
	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})		
	}

	const logout = (token:string) => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						token:token}
			},
			action:"logout"
		})
	}
	
	const getList = (token:string) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"getlist"
		})
	}
	
	const addItem = (token:string,item:ShoppingItem) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (token:string,id:number) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (token:string,item:ShoppingItem) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	return {
		register,
		login,
		logout,
		getList,
		addItem,
		removeItem,
		editItem		
	}
}

export default useAction;