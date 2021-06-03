import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	removeFromList(id:number):void;
	cancel():void;
}

export default class RemoveRow extends React.Component<Props> {

	render() {
		return(
			<tr>
				<td>{this.props.item.type}</td>
				<td>{this.props.item.count}</td>
				<td>{this.props.item.price}</td>
				<td><button onClick={() => {
					this.props.cancel()
				}}>Cancel</button></td>
				<td><button onClick={() => {
					this.props.removeFromList(this.props.item.id)
				}}>Confirm</button></td>
			</tr>
		)		
	}
}