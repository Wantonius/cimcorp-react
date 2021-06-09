import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch,useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {editItem,removeFromList} from '../actions/shoppingActions';


interface ListState {
	login:{
		token:string
	},
	shopping:{
		list:ShoppingItem[]
	}
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = () => {
	
	const [state,setState]= useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const listState = (state:ListState) => state;
	
	const tempState = useSelector(listState);
	
	const handleRemoveButton = (id:number) => {
		for(let i=0;i<tempState.shopping.list.length;i++) {
			if(id === tempState.shopping.list[i].id) {
				setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}
	
	const handleEditButton = (id:number) => {
		for(let i=0;i<tempState.shopping.list.length;i++) {
			if(id === tempState.shopping.list[i].id) {
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
		dispatch(removeFromList(tempState.login.token,id));
		cancel();
	}
	
	const edit = (item:ShoppingItem) => {
		dispatch(editItem(tempState.login.token,item));
		cancel();
	}
	

	let items = tempState.shopping.list.map((item,index) => {
		if(state.removeIndex === index) {
			return (<RemoveRow key={item.id} item={item}
			removeFromList={remove} 
			cancel={cancel}/>)
		}
		if(state.editIndex === index) {
			return (<EditRow key={item.id} item={item}
			cancel={cancel} editItem={edit}/>)
		}
		return <Row key={item.id} item={item} handleRemoveButton={handleRemoveButton} handleEditButton={handleEditButton}/>
	});
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