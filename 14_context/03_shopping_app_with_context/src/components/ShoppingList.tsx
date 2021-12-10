import React,{useState} from 'react';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface State {
	removeIndex:number,
	editIndex:number
}

const ShoppingList:React.FC<{}> = () => {

	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const {list,token} = useAppState();
	const {removeItem,editItem} = useAction();
	
	const handleRemoveButton = (id:number) => {
		for(let i=0;i<list.length;i++) {
			if(id === list[i].id) {
				setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}
	
	const handleEditButton = (id:number) => {
		for(let i=0;i<list.length;i++) {
			if(id === list[i].id) {
				setState({
					removeIndex:-1,
					editIndex:i
				})
			}
		}
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const remove = (id:number) => {
		removeItem(token,id);
		cancel()
	}
	
	const edit = (item:ShoppingItem) => {
		editItem(token,item);
		cancel();
	}
	
	let items = list.map((item,index) => {
		if(state.removeIndex === index) {
			return (<RemoveRow key={item.id} item={item} removeFromList={remove} cancel={cancel}/>)
		}
		if(state.editIndex === index) {
			return (<EditRow key={item.id} item={item} editItem={edit} cancel={cancel}/>)
		}
		return (<Row key={item.id} item={item} handleRemoveButton={handleRemoveButton} handleEditButton={handleEditButton}/>)
	})
	return(
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>	
	)
}

export default ShoppingList;