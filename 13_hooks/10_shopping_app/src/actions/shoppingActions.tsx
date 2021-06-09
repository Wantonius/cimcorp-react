import ShoppingItem from '../models/ShoppingItem';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import * as actionConstants from '../types/actionConstants';
	

//ASYNC ACTION CREATORS
	
const handleFetch = (req:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>,token:string) => {
		let loadingAction:AnyAction = {
			type:actionConstants.LOADING
		}
		dispatch(loadingAction);
		fetch(req).then(response => {
			loadingAction.type = actionConstants.STOP_LOADING;
			dispatch(loadingAction);
			if(response.ok) {
				response.json().then(data => {
					if(act === "getlist") {
						let list = data as ShoppingItem[];
						let action:AnyAction = {
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						}
						dispatch(action);
					} 
					if(act === "addtolist") {
						let action:AnyAction = {
							type:actionConstants.ADD_NEW_ITEM_SUCCESS
						}	
						dispatch(action);
						dispatch(getList(token));
					}
					if(act === "removefromlist") {
						let action:AnyAction = {
							type:actionConstants.REMOVE_ITEM_SUCCESS
						}	
						dispatch(action);
						dispatch(getList(token));
					}
					if(act === "edititem") {
						let action:AnyAction = {
							type:actionConstants.EDIT_ITEM_SUCCESS
						}	
						dispatch(action);
						dispatch(getList(token));
					}
				}).catch(error => {
					console.log("Error parsing JSON:",error);
				})
			} else {
				if(response.status === 403) {
					let action = {
						type:actionConstants.LOGOUT_FAILED,
						error:"Session expired. Logging you out!"
					}
					dispatch(action)
				} else {
					if(act === "getlist") {
						let action:AnyAction = {
							type:actionConstants.FETCH_LIST_FAILED,
							error:"Fetch shopping list failed. Server responded with a status:"+response.status
						}
						dispatch(action);
					} 
					if(act === "addtolist") {
						let action:AnyAction = {
							type:actionConstants.ADD_NEW_ITEM_FAILED,
							error:"Adding new item failed. Server responded with a status:"+response.status
						}
						dispatch(action);
					}
					if(act === "removefromlist") {
						let action:AnyAction = {
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:"Removing item failed. Server responded with a status:"+response.status
						}
						dispatch(action);
					}
					if(act === "edititem") {
						let action:AnyAction = {
							type:actionConstants.EDIT_ITEM_FAILED,
							error:"Edit item failed. Server responded with a status:"+response.status
						}
						dispatch(action);
					}
				}				
			}
		}).catch(error => {
			console.log(error)
		});
	}
	
export const getList = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",token);
		const request = new Request("/api/shopping",{
			method:"GET",
			headers:requestHeaders
		})
		handleFetch(request,"getlist",dispatch,"");
	}
}
export const addToList = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",token);
		const request = new Request("/api/shopping",{
			method:"POST",
			headers:requestHeaders,
			body:JSON.stringify(item)
		})
		handleFetch(request,"addtolist",dispatch,token);
	}
}
	
export const removeFromList = (token:string,id:number) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",token);
		const request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:requestHeaders
		})
		handleFetch(request,"removefromlist",dispatch,token);
	}
}	

export const editItem = (token:string, item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",token);
		const request = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			headers:requestHeaders,
			body:JSON.stringify(item)
		})
		handleFetch(request,"edititem",dispatch,token);
	}
}
