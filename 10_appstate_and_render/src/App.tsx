import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Switch,Redirect} from 'react-router-dom';

interface State {
	list:ShoppingItem[];
	isLogged:boolean;
	token:string;
	loading:boolean;
	error:string;
}

interface BackendMessage {
	message?:string;
	token?:string;
}

class App extends React.Component<{},State> {
	
	state:State = {
		list:[],
		isLogged:false,
		loading:false,
		token:"",
		error:""
	}
	
	handleFetch = (req:Request,action:string) => {
		fetch(req).then(response => {
			if(response.ok) {
				response.json().then(data => {
					if(action === "getlist") {
						let list = data as ShoppingItem[];
						this.setState({
							list:list
						});
					} else {
						let message = data as BackendMessage;
						this.getList();
						console.log(message);
					}
				}).catch(error => {
					console.log("Error parsing JSON:",error);
				})
			} else {
				console.log("Server responded with a status:",response.statusText)
			}
		}).catch(error => {
			console.log(error)
		});
	}
	
	getList = () => {
		const request = new Request("/api/shopping",{
			method:"GET",
			headers:{
				"Content-type":"application/json"
			}
		})
		this.handleFetch(request,"getlist");
	}
	
	addToList = (item:ShoppingItem) => {
		const request = new Request("/api/shopping",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		this.handleFetch(request,"addtolist");
	}
	
	removeFromList = (id:number) => {
		const request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:{
				"Content-type":"application/json"
			}
		})
		this.handleFetch(request,"removefromlist");
	}
	
	editItem = (item:ShoppingItem) => {
		const request = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		this.handleFetch(request,"edititem");
	}
	
	render() {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => (
						<LoginPage />
					)}/>
					<Route path="/list" render={() => (
						<ShoppingList list={this.state.list} removeFromList={this.removeFromList}
						editItem={this.editItem}/>	
					)}/>
					<Route path="/form" render={() => (
						<ShoppingForm addToList={this.addToList}/>
					)}/>
					<Route render={() => (<Redirect to="/"/>)}/>
				</Switch>				
			</div>
		);
	}
}

export default App;
