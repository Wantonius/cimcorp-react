import React,{useState,useContext} from 'react';
import ShoppingItem from './ShoppingItem';
import LocalContext from './LocalContext';


interface Props {
	addToList:(item:ShoppingItem) => void
}

interface State {
	type:string,
	count:number,
	price:number
}

const ShoppingForm:React.FC<Props> = (props:Props) => {
	
	const locations = useContext(LocalContext);
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.currentTarget.name]:event.currentTarget.value
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let item = new ShoppingItem(0,state.type,state.count,state.price);
		props.addToList(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">{locations.type}:</label>
			<input type="text"
					name="type"
					onChange={onChange}
					value={state.type}/>
			<br/>
			<label htmlFor="count">{locations.count}:</label>
			<input type="number"
					name="count"
					onChange={onChange}
					value={state.count}/>
			<br/>
			<label htmlFor="price">{locations.price}:</label>
			<input type="number"
					name="price"
					step="0.01"
					onChange={onChange}
					value={state.price}/>
			<br/>
			<input type="submit" value={locations.add}/>
		</form>
	)
}

export default ShoppingForm;