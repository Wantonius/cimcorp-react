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
	message:string;
}

interface Token {
	token:string;
}

class App extends React.Component<{},State> {
	
	state:State = {
		list:[],
		isLogged:false,
		loading:false,
		token:"",
		error:""
	}
	
	//LOGIN API
	
	register = (username:string,password:string) => {
		const request:Request = new Request("/register",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		this.handleLogin(request,"register");
	}


	login = (username:string,password:string) => {
		const request:Request = new Request("/login",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		this.handleLogin(request,"login");
	}	
	
	handleLogin = async (request:Request,action:string) => {
		this.setState({
			loading:true
		})
		const response = await fetch(request);
		this.setState({
			loading:false
		})
		if(response.ok) {
			if(action === "register") {
				alert("Register success");
			} else {
				const temp = await response.json();
				let data = temp as Token;
				this.setState({
					token:data.token,
					isLogged:true,
					error:""
				}, () => {
					this.getList();
				})
			}
		} else {
			this.setState({
				error:"Server responded with a status:"+response.statusText
			})
		}
	}
	//REST API
	
	
	handleFetch = (req:Request,action:string) => {
		this.setState({
			loading:true
		})
		fetch(req).then(response => {
			this.setState({
				loading:false
			})
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
				this.setState({
					error:"Server responded with a status:"+response.statusText
				})
			}
		}).catch(error => {
			this.setState({
				error:"Server responded with a status:"+error
			})
		});
	}
	
	getList = () => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.state.token);
		const request = new Request("/api/shopping",{
			method:"GET",
			headers:requestHeaders
		})
		this.handleFetch(request,"getlist");
	}
	
	addToList = (item:ShoppingItem) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.state.token);
		const request = new Request("/api/shopping",{
			method:"POST",
			headers:requestHeaders,
			body:JSON.stringify(item)
		})
		this.handleFetch(request,"addtolist");
	}
	
	removeFromList = (id:number) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.state.token);
		const request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:requestHeaders
		})
		this.handleFetch(request,"removefromlist");
	}
	
	editItem = (item:ShoppingItem) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.state.token);
		const request = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			headers:requestHeaders,
			body:JSON.stringify(item)
		})
		this.handleFetch(request,"edititem");
	}
	
	render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged} error={this.state.error} loading={this.state.loading}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => 
					this.state.isLogged ? 
					(<Redirect to="/list"/>) : 
					(<LoginPage register={this.register} login={this.login} />)
					}/>
					<Route path="/list" render={() => this.state.isLogged ? (
						<ShoppingList list={this.state.list} removeFromList={this.removeFromList}
						editItem={this.editItem}/>	
					): 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.state.isLogged? (
						<ShoppingForm addToList={this.addToList}/>
					):
					(<Redirect to="/"/>)
					}/>
					<Route render={() => this.state.isLogged ?
					(<Redirect to="/list"/>) :
					(<Redirect to="/"/>)}/>
				</Switch>				
			</div>
		);
	}
}

export default App;
