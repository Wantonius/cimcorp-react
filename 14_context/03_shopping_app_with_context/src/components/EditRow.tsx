import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	editItem(item:ShoppingItem):void;
	cancel():void;
}

interface State {
	type:string,
	count:number,
	price:number
}

const EditRow:React.FC<Props> = (props) => {
	
	const [state,setState] = useState<State>({
		type:props.item.type,
		count:props.item.count,
		price:props.item.price
	})
	
	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.currentTarget.name]:event.currentTarget.value
		})
	}
	
	const editItem = () => {
		let item = new ShoppingItem(props.item.id,state.type,state.count,state.price)
		props.editItem(item)
	}
	
	return (
		<tr>
			<td><input type="text"
					name="type"
					onChange={onChange}
					value={state.type}/></td>
			<td><input type="number"
					name="count"
					onChange={onChange}
					value={state.count}/></td>
			<td><input type="number"
					name="price"
					step="0.01"
					onChange={onChange}
					value={state.price}/></td>
			<td><button onClick={() => editItem()}>Save</button></td>
			<td><button onClick={() => props.cancel()}>Cancel</button></td>
		</tr>
	)
}

export default EditRow;