import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import useTheme from '../hooks/useTheme';

interface Props {
	addToList:(item:ShoppingItem) => void
}

interface State {
	type:string,
	count:number,
	price:number
}

const ShoppingForm:React.FC<Props> = (props) => {
	
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const theme = useTheme();
	
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
		<form onSubmit={onSubmit} style={{
			backgroundColor:theme.backgroundColor,
			color:theme.color
		}}>
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