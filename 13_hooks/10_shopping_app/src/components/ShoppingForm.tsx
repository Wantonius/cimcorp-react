import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {addToList} from '../actions/shoppingActions';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../types/states';
import {AnyAction} from 'redux';
import {useDispatch,useSelector} from 'react-redux';

interface TokenState {
	login:{
		token:string
	}
}

interface State {
	type:string;
	count:number;
	price:number;
}

const ShoppingForm:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const tokenState = (state:TokenState) => state.login.token
	
	const token = useSelector(tokenState);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const onChange = (e:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.currentTarget.name]:e.currentTarget.value
		})
	}
	
	const onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let item = new ShoppingItem(0,state.type,state.count,state.price);
		dispatch(addToList(token,item));
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">Type:</label>
			<input type="text"
					name="type"
					onChange={onChange}
					value={state.type}/>
			<br/>
			<label htmlFor="count">Count:</label>
			<input type="number"
					name="count"
					onChange={onChange}
					value={state.count}/>
			<br/>
			<label htmlFor="price">Price:</label>
			<input type="number"
					name="price"
					step="0.01"
					onChange={onChange}
					value={state.price}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	)
	
	
}

export default ShoppingForm;