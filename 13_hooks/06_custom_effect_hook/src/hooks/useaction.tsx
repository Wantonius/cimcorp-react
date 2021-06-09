import React,{useReducer,useEffect,useState} from 'react';
import ShoppingItem from '../ShoppingItem';

interface State {
	list:ShoppingItem[],
	loading:boolean
}

interface FetchState {
	request:Request
}


const initialState:State = {
	list:[],
	loading:false
}

type Action = {
	type:string,
	payload:any
}

const listReducer = (state:State,action:Action) => {
	switch(action.type) {
		case "LOADING": {
			return {
				...state,
				loading:true
			}
		}
		case "STOP_LOADING":
			return {
				...state,
				loading:false
			}
		case "FETCH_DONE":
			return {
				...state,
				list:action.payload as ShoppingItem[]
			}
		default:
			return state;
	}
}

export const useAction = ():[ShoppingItem[],boolean,(item:ShoppingItem) => void, (id:number) => void] => {

	const [state,setState] = useState<FetchState>({
		request:new Request("",{})
	})
	
	const [reducerState,dispatch] = useReducer(listReducer,initialState);

	useEffect(() => {
		const fetchData = async () => {
			dispatch({type:"LOADING",payload:{}});
			try {
				const response = await fetch(state.request);
				dispatch({type:"STOP_LOADING",payload:{}})
				if(response.ok) {
					if(state.request.method === "GET") {
						const data = await response.json();
						dispatch({type:"FETCH_DONE",payload:data})
					} else {
						getList();
					}
				}
			} catch(error) {
				console.log(error);
			}
		}
		
		fetchData();
	},[state.request]);

	const getList = () => {
		let tempRequest:Request = new Request("/api/shopping",{
			method:"GET"
		})
		setState({
			request:tempRequest
		})
	}

	const addToList = (item:ShoppingItem) => {
		let tempRequest:Request = new Request("/api/shopping",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		setState({
			request:tempRequest
		})
	}
	
	const removeFromList = (id:number) => {
		let tempRequest:Request = new Request("/api/shopping/"+id,{
			method:"DELETE"
		})
		setState({
			request:tempRequest
		})
	}
	
	return [reducerState.list,reducerState.loading,addToList,removeFromList];
}