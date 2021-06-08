const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());


//databases

let database = [];
let id = 500;

// REST API

app.get("/api/hotel",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/hotel",function(req,res) {
	let item = {
		id:id,
		name:req.body.name,
		address:req.body.address,
		city:req.body.city,
		country:req.body.country,
		comment:req.body.comment
	}
	id++;
	database.push(item);
	return res.status(200).json({message:"success"});
})

app.delete("/api/hotel/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempList = database.filter(item => item.id !== tempId);
	database = tempList;
	return res.status(200).json({message:"succees"})
})

app.put("/api/hotel/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let newItem = {
		id:tempId,
		name:req.body.name,
		address:req.body.address,
		city:req.body.city,
		country:req.body.country,
		comment:req.body.comment
	}
	let tempList = database.map(item => item.id !== newItem.id ? item : newItem)
	database = tempList;
	return res.status(200).json({message:"success"})
})


let port = process.env.PORT || 3001

app.listen(port);

console.log("Running in port:"+port);