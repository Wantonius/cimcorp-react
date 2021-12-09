import React from 'react';
import ShoppingItem from './ShoppingItem';

interface Props {
	list:ShoppingItem[],
	removeFromList:(id:number) => void
}

const ShoppingList:React.FC<Props> = (props:Props) => {
	
	//TODO: Ota LocalContext käyttöön ja laita lokalisaatiostringit oikeille paikoilleen

	let items = props.list.map((item) => {
		return (
			<tr key={item.id}>
				<td>{item.type}</td>
				<td>{item.count}</td>
				<td>{item.price}</td>
				<td><button onClick={() => props.removeFromList(item.id)}>Remove</button></td>
			</tr>
		)
	})
	return (
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
}

export default ShoppingList;