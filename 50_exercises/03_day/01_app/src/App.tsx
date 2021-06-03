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
	
	//TODO Remember to start the backend in another terminal using command "node app"
	
	/*
		REST API
		GET /api/hotel -> get all hotels
		POST /api/hotel -> add new hotel. Needs the new hotel as body
		DELETE /api/hotel/:id -> remove hotel by id
		PUT /api/hotel/:id -> update the hotel by id. Needs the new hotel as body
	*/
	
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
		//TODO create the request for getting the list
	}
	
	addToList = (item:HotelInfo) => {
		//TODO create the request for adding to the list
	}
	
	removeFromList = (id:number) => {
		//TODO create the request for removing from the list
	}

	editItem = (item:HotelInfo) => {
		//TODO create the request to edit item
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
