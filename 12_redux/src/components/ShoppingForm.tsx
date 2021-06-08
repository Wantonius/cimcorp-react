import React from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {addToList} from '../actions/shoppingActions';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../types/states';
import {AnyAction} from 'redux';
import {connect,ConnectedProps} from 'react-redux';

const mapStateToProps = (state:AppState) => {
	return {
		token:state.login.token
	}
}

const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,AnyAction>) => {
	return {
		addToList:(token:string,item:ShoppingItem) => dispatch(addToList(token,item))
	}
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface State {
	type:string;
	count:number;
	price:number;
}

class ShoppingForm extends React.Component<PropsFromRedux,State> {
	
	state:State = {
		type:"",
		count:0,
		price:0
	}
	
	onChange = (e:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);
	}
	
	onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let item = new ShoppingItem(0,this.state.type,this.state.count,this.state.price);
		this.props.addToList(this.props.token,item);
		this.setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="type">Type:</label>
				<input type="text"
						name="type"
						onChange={this.onChange}
						value={this.state.type}/>
				<br/>
				<label htmlFor="count">Count:</label>
				<input type="number"
						name="count"
						onChange={this.onChange}
						value={this.state.count}/>
				<br/>
				<label htmlFor="price">Price:</label>
				<input type="number"
						name="price"
						step="0.01"
						onChange={this.onChange}
						value={this.state.price}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
	
}

export default connector(ShoppingForm);