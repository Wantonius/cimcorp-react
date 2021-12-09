import React from 'react';
import ShoppingItem from './ShoppingItem';


interface Props {
	list:ShoppingItem[],
	removeFromList:(id:number) => void
}

const ShoppingList:React.FC<Props> = (props:Props) => {

	//TODO käytä useLocale hookkia tuomaan localisaatiotiedot locations muuttujaan.
	let items = props.list.map((item) => {
		return (
			<tr key={item.id}>
				<td>{item.type}</td>
				<td>{item.count}</td>
				<td>{item.price}</td>
				<td><button onClick={() => props.removeFromList(item.id)}>{locations.remove}</button></td>
			</tr>
		)
	})
	return (
		<table>
			<thead>
				<tr>
					<th>{locations.type}</th>
					<th>{locations.count}</th>
					<th>{locations.price}</th>
					<th>{locations.remove}</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
}

export default ShoppingList;