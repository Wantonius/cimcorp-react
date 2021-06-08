import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {LoginState} from './types/states';

interface State {
	list:ShoppingItem[];
}

interface BackendMessage {
	message:string;
}

const mapStateToProps = (state:LoginState) => {
	console.log("App.tsx mapStateToProps");
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux,State> {
	
	state:State = {
		list:[],
	}
	
	//REST API
	
	
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
				console.log("Server responded with a status:"+response.statusText)
			}
		}).catch(error => {
			console.log(error)
		});
	}
	
	getList = () => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.props.token);
		const request = new Request("/api/shopping",{
			method:"GET",
			headers:requestHeaders
		})
		this.handleFetch(request,"getlist");
	}
	
	addToList = (item:ShoppingItem) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.props.token);
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
		requestHeaders.append("token",this.props.token);
		const request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:requestHeaders
		})
		this.handleFetch(request,"removefromlist");
	}
	
	editItem = (item:ShoppingItem) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-type","application/json");
		requestHeaders.append("token",this.props.token);
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
				<Navbar />
				<hr/>
				<Switch>
					<Route exact path="/" render={() => 
					this.props.isLogged ? 
					(<Redirect to="/list"/>) : 
					(<LoginPage  />)
					}/>
					<Route path="/list" render={() => this.props.isLogged ? (
						<ShoppingList list={this.state.list} removeFromList={this.removeFromList}
						editItem={this.editItem}/>	
					): 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.props.isLogged? (
						<ShoppingForm addToList={this.addToList}/>
					):
					(<Redirect to="/"/>)
					}/>
					<Route render={() => this.props.isLogged ?
					(<Redirect to="/list"/>) :
					(<Redirect to="/"/>)}/>
				</Switch>				
			</div>
		);
	}
}

export default connector(App);
