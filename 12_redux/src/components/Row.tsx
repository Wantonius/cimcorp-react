import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	handleRemoveButton(id:number):void;
	handleEditButton(id:number):void;
}

export default class Row extends React.Component<Props> {

	render() {
		return(
			<tr>
				<td>{this.props.item.type}</td>
				<td>{this.props.item.count}</td>
				<td>{this.props.item.price}</td>
				<td><button onClick={() => {
					this.props.handleRemoveButton(this.props.item.id)
				}}>Remove</button></td>
				<td><button onClick={() => {
					this.props.handleEditButton(this.props.item.id)
				}}>Edit</button></td>
			</tr>
		)		
	}
}