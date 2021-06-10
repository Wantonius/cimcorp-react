const express = require("express");


let router = express.Router();
//database

let database = [{
	id:90,
	name:"Matti Meikäläinen",
	apartment:"b35", 
	date:1623296671470,
	desc:"vessa tukossa", 
	user:"",
	state: "unassigned"
},
{
	id:91,
	name:"Matti Meikäläinen",
	apartment:"b35", 
	date:1623290000000,
	desc:"patterit pitää ilmata", 
	user:"admin",
	state: "completed"
},
{
	id:92,
	name:"Matti Meikäläinen",
	apartment:"b35", 
	date:1623296000000,
	desc:"käytävät pitää siivota", 
	user:"admin",
	state: "open"
},
{
	id:93,
	name:"Jaska Jokunen",
	apartment:"a12", 
	date:1623296831626,
	desc:"ilmastointi ei toimi", 
	user:"",
	state: "unassigned"
},
{
	id:94,
	name:"Jaska Jokunen",
	apartment:"a12", 
	date:1579471200000,
	desc:"lumet pitää luoda", 
	user:"admin",
	state: "completed"
}];

let id = 100;

/*
Data structure
let contact = {
	name:string //name of the complaint maker
	apartment:string // number of the apartment as string f.ex "a 5"
	date:number // epoch time in milliseconds entered by backend when first created
	desc:string // description of the problem
	user:string // username of the handler or ""
	state: unassigned | open | completed // first unassigned, then open when user is handling it, funally done
}
*/

//REST API

router.get("/api/complaint",function(req,res) {
	let tempList = database;
	if(req.query.state) {
		let state = req.query.state;
		tempList = database.filter(item => item.state === state)		
	} 
	if(req.query.apartment) {
		let temp = req.query.apartment;
		tempList = tempList.filter(item => item.apartment === temp)
	}	
	return res.status(200).json(tempList);
});

router.post("/complaint",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	let complaint = {
		id:id,
		name:req.body.name, 
		apartment:req.body.apartment, 
		date:Date.now(),
		desc:req.body.desc,
		user:"",
		state: "unassigned" 
	}
	id++;
	database.push(complaint);
	console.log(database);
	return res.status(200).json({message:"success!"})
});


router.put("/api/complaint/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			let tempContact = database[i];
			if(req.query.state) {
				tempContact.state = req.query.state
			}
			tempContact.user = req.session.username;
			if(tempContact.state === "unassigned") {
				tempContact.state = "open";
			}
			database.splice(i,1,tempContact);
			return res.status(200).json({message:"success"});
		
		}
	}
	return res.status(404).json({message:"not found"});
})

module.exports = router