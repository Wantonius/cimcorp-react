import React from 'react';
import Die from './Die';

interface Props {};

interface State {
	first_dice:number;
	second_dice:number;
}

export default class DiceRoller extends React.Component<Props,State> {

	state:State = {
		first_dice:0,
		second_dice:0
	}
	
	rollDice = async (event:React.SyntheticEvent) => {
		let temp_one = Math.floor(Math.random()*6)+1;
		await(50);
		let temp_two = Math.floor(Math.random()*6)+1;
		this.setState({
			first_dice:temp_one,
			second_dice:temp_two
		})
	}
	render() {
		let total = this.state.first_dice + this.state.second_dice;
		return (
			<div>
				<h2>Dice value:{total}</h2>
				<Die value={this.state.first_dice}/>
				<Die value={this.state.second_dice}/>
				<button onClick={this.rollDice}>Roll dice</button>
			</div>
		)	
		
	}
}