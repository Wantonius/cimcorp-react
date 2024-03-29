import React,{useState} from 'react';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';
import ShoppingItem from '../models/ShoppingItem';

interface State {
	type:string,
	count:number,
	price:number
}

const ShoppingForm:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const {addItem} = useAction();
	const {token} = useAppState();
	
	const onChange = (e:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.currentTarget.name]:e.currentTarget.value
		})
	}
	
	const onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let item = new ShoppingItem(0,state.type,state.count,state.price);
		addItem(token,item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return (
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