import React,{useMemo,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	
	const [count,setCount] = useState<number>(0);
	const [currentWord,setCurrentWord] = useState<number>(0);
	const words:string[] =['banaani','omena','loma','kaljaa'];
	const word:string = words[currentWord];
	
	const computeWordLength = (word:string) => {
		let i:number = 0;
		while(i<100000) {
			i++;
			console.log(i);
		}
		return word.length;
	}
	
	//const wordLength = computeWordLength(word);
	const wordLength = useMemo(() => computeWordLength(word),[word])
	
	return (
		<div className="App">
			<h2>Compute the length of the word:{word}</h2>
			<h2>{word} has {wordLength} letters</h2>
			<button onClick={() => {
				const next:number = currentWord +1 === words.length ? 0:currentWord+1
				setCurrentWord(next);
			}}>Next Word</button>
			
			<h2>Increment counter</h2>
			<h2>Current Value:{count}</h2>
			<button onClick={() => setCount(count => count +1)}>Increment</button>
		</div>
	);
}

export default App;
