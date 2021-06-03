import React from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface Props {
	list:ShoppingItem[];
	removeFromList(id:number):void;
	editItem(item:ShoppingItem):void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

export default class ShoppingList extends React.Component<Props,State> {
	
	state:State = {
		removeIndex:-1,
		editIndex:-1
	}
	
	handleRemoveButton = (id:number) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i].id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}
	
	handleEditButton = (id:number) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i].id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				})
			}
		}		
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	removeFromList = (id:number) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item:ShoppingItem) => {
		this.props.editItem(item);
		this.cancel();
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.removeIndex === index) {
				return (<RemoveRow key={item.id} item={item}
				removeFromList={this.removeFromList} 
				cancel={this.cancel}/>)
			}
			if(this.state.editIndex === index) {
				return (<EditRow key={item.id} item={item}
				cancel={this.cancel} editItem={this.editItem}/>)
			}
			return <Row key={item.id} item={item} handleRemoveButton={this.handleRemoveButton} handleEditButton={this.handleEditButton}/>
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
	
}