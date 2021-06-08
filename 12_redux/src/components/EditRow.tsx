import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	editItem(item:ShoppingItem):void;
	cancel():void;
}

interface State {
	type:string;
	count:number;
	price:number;
}

export default class EditRow extends React.Component<Props> {
	
	state:State = {
		type:this.props.item.type,
		count:this.props.item.count,
		price:this.props.item.price
	}
	
	onChange = (event:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[event.currentTarget.name] = event.currentTarget.value;
		this.setState(state);
	}
	
	editItem = () => {
		let item = new ShoppingItem(this.props.item.id, this.state.type,this.state.count,this.state.price);
		this.props.editItem(item);
	}
	
	render() {
		return(
			<tr>
				<td><input type="text"
					name="type"
					onChange={this.onChange}
					value={this.state.type}/></td>
				<td><input type="number"
						name="count"
						onChange={this.onChange}
						value={this.state.count}/></td>
				<td><input type="number"
							name="price"
							step="0.01"
							onChange={this.onChange}
							value={this.state.price}/></td>
				<td><button onClick={() => {
					this.editItem()
				}}>Save</button></td>
				<td><button onClick={() => {
					this.props.cancel();
				}}>Cancel</button></td>
			</tr>
		)		
	}
}