import {useState} from 'react';

export const useCount = (initialValue:number = 0):[number,() => void,() => void] => {
	
	const [value,setValue] = useState<number>(initialValue);
	
	const add = () => {
		setValue((value) => value + 1)
	}
	
	const substract = () => {
		setValue((value) => value - 1)
	}
	
	return [value,add,substract]
}