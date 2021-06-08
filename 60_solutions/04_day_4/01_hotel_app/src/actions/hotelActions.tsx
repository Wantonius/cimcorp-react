import * as actionConstants from './actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import HotelInfo from '../models/HotelInfo';
import {AnyAction} from 'redux';


//ASYNC ACTION CREATORS
const handleFetch = (req:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
	let loadingAction:AnyAction = {
		type:actionConstants.LOADING,
		list:[],
		error:""		
	}
	dispatch(loadingAction);
	fetch(req).then(response => {
		loadingAction.type = actionConstants.STOP_LOADING;
		dispatch(loadingAction)
		if(response.ok) {
			response.json().then(data => {
				if(act === "getlist") {
					let list = data as HotelInfo[];
					let action:AnyAction = {
						type:actionConstants.FETCH_HOTELS_SUCCESS,
						list:list,
						error:""
					}
					dispatch(action);
				} 
				if(act === "addtolist") {
					let action:AnyAction = {
						type:actionConstants.ADD_HOTEL_SUCCESS,
						list:[],
						error:""
					}
					dispatch(action);
					dispatch(getList());
				}
				if(act === "removefromlist") {
					let action:AnyAction = {
						type:actionConstants.REMOVE_HOTEL_SUCCESS,
						list:[],
						error:""
					}
					dispatch(action);
					dispatch(getList());					
				}
				if(act === "edititem") {
					let action:AnyAction = {
						type:actionConstants.EDIT_HOTEL_SUCCESS,
						list:[],
						error:""
					}
					dispatch(action);
					dispatch(getList());
				}
			}).catch(error => {
				console.log("Failed to parse JSON:"+error);
			})
		} else {
				if(act === "getlist") {
					let action:AnyAction = {
						type:actionConstants.FETCH_HOTELS_FAILED,
						list:[],
						error:"Fetch hotels failed. Server responded with a status:"+response.status
					}
					dispatch(action);
				} 
				if(act === "addtolist") {
					let action:AnyAction = {
						type:actionConstants.ADD_HOTEL_FAILED,
						list:[],
						error:"Adding a hotel failed. Server responded with a status:"+response.status
					}
					dispatch(action);
				}
				if(act === "removefromlist") {
					let action:AnyAction = {
						type:actionConstants.REMOVE_HOTEL_FAILED,
						list:[],
						error:"Remove a hotel failed. Server responded with a status:"+response.status
					}
					dispatch(action);						
				}
				if(act === "edititem") {
					let action:AnyAction = {
						type:actionConstants.EDIT_HOTEL_FAILED,
						list:[],
						error:"Editing a hotel  failed. Server responded with a status:"+response.status
					}
					dispatch(action);
				}
		}
	}).catch(error => {
		console.log(error);
	})
} 
	
export const getList = () => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {	
		const request = new Request("/api/hotel",{
			method:"GET",
			headers:{
				"Content-type":"application/json"
			}
		})
		handleFetch(request,"getlist",dispatch);
	}
}

export const addToList = (item:HotelInfo) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {		
		const request = new Request("/api/hotel",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"addtolist", dispatch);
	}
}	

export const removeFromList = (id:number) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {	
		const request = new Request("/api/hotel/"+id,{
			method:"DELETE",
			headers:{
				"Content-type":"application/json"
			}
		})
		handleFetch(request,"removefromlist", dispatch);
	}
}

export const editItem = (item:HotelInfo) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {	
		const request = new Request("/api/hotel/"+item.id,{
			method:"PUT",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"edititem",dispatch);		
	}
}