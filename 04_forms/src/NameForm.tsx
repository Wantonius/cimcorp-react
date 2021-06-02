import React from 'react';

interface Props {
	greet(firstname:string,lastname:string):void;
}

interface State {
	firstname:string;
	lastname:string;
}

export default class NameForm extends React.Component<Props,State> {
	
	state:State = {
		firstname:"",
		lastname:""
	}
	
	onChange = (e:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);
		//this.setState({[e.currentTarget.name]:e.currentTarget.value})
	}
	
	onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		this.props.greet(this.state.firstname,this.state.lastname);
		this.setState({
			firstname:"",
			lastname:""
		})
	}
	
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First Name</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last name</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<input type="submit" value="Greet"/>
			</form>
		)	
	}
}