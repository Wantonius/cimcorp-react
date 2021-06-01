import React from 'react';
import Die from './Die';
//TODO We will create a dice roller which rolls two dice with values
//between 1-6 and displays the total.

interface Props {};

interface State {
	//TODO create state for two distinct die valuenumbers. 
}

export default class DiceRoller extends React.Component<Props,State> {

	//TODO Reintroduce the state for better type inference
	
	rollDice = (event:React.SyntheticEvent) => {
		//TODO use Math.floor and Math.random
		//to create two different random values.
		//If need be use async-await to sleep and change the timeseed.
		//More on async-await (Read up if this is not familiar): https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
		//Change the state to the new dice values using this.setState
	}
	render() {
		let total = this.state.first_dice + this.state.second_dice;
		return (
			<div>
				//TODO Create a message display for total value
				//Pass the right state value to each dice as props
				//Create a button to handle the onClick event and
				//call rollDice function.
			</div>
		)	
		
	}
}