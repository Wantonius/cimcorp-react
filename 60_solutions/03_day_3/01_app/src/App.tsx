import React from 'react';
import './App.css';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import HotelForm from './components/HotelForm';
import Details from './components/Details';
import HotelInfo from './models/HotelInfo';
import {Route,Switch} from 'react-router-dom';

interface State {
	list:HotelInfo[]
}



interface BackendMessage {
	message:string
}

class App extends React.Component<{},State> {
	
	state:State = {
		list:[]
	}
	
	componentDidMount() {
		this.getList();
	}
	
	handleFetch = (req:Request,action:string) => {
		fetch(req).then(response => {
			if(response.ok) {
				response.json().then(data => {
					if(action === "getlist") {
						let list = data as HotelInfo[];
						this.setState({
							list:list
						})
					} else {
						let message = data as BackendMessage;
						this.getList();
						console.log(message);
					} 
				})
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log(error);
		})
	} 
	
	getList = () => {		
		const request = new Request("/api/hotel",{
			method:"GET",
			headers:{
				"Content-type":"application/json"
			}
		})
		this.handleFetch(request,"getlist");
	}
	
	addToList = (item:HotelInfo) => {
		const request = new Request("/api/hotel",{
			method:"POST",
			headers:{
				"Content-type":"application/json"
			},
			body:JSON.stringify(item)
		})
		this.handleFetch(request,"addtolist");
	}
	
	removeFromList = (id:number) => {
		const request = new Request("/api/hotel/"+id,{
			method:"DELETE",
			headers:{
				"Content-type":"application/json"
			}
		})
		this.handleFetch(request,"removefromlist");
	}

	editItem = (item:HotelInfo) => {
		const request = new Request("/api/hotel/"+item.id,{
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
					<Route exact path="/" render={() => 
						(<HotelList list={this.state.list} removeFromList={this.removeFromList}/>)
					}/>
					<Route path="/form" render={() => 
						(<HotelForm addToList={this.addToList}/>)
					}/>
					<Route path="/hotel/:id" render={() => 
						(<Details list={this.state.list} editItem={this.editItem}/>)
					}/>
				</Switch>
			</div>
		);
	}
}

export default App;
