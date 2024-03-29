const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");

let app = express();

app.use(bodyParser.json());


//login databases

let registeredUsers = [];
let loggedSessions = [];
let ttl = 3600000;

//middleware

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"})
			}
			req.session = {};
			req.session.user = loggedSessions[i].user;
			loggedSessions[i].ttl = loggedSessions[i].ttl+ttl;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
}

createToken = () => {
	const letters = "abcdefghijABCDEFGHIJ0123456789";
	let token = "";
	for(let i=0;i<128;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp];
	}
	return token;
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please enter proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please enter proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(422).json({message:"Username must be atleast 4 and password 8 characters long"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"})
		}
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	registeredUsers.push(user);
	return res.status(200).json({message:"success"})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please enter proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please enter proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(422).json({message:"Username must be atleast 4 and password 8 characters long"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			if(req.body.password === registeredUsers[i].password) {
				let token = createToken();
				let tempttl = Date.now();
				let session = {
					user:req.body.username,
					ttl:tempttl+ttl,
					token:token
				}
				loggedSessions.push(session);
				return res.status(200).json({token:token})
				
			}
		}
	}
	return res.status(403).json({message:"forbidden"})
})

app.post("/logout",function(req,res) {
	let token = req.headers.token
	if(!token) {
		console.log("No session found");
		return res.status(404).json({message:"not found"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			loggedSessions.splice(i,1)
			return res.status(200).json({message:"success"})
		}
	}
	console.log("No session found");
	return res.status(404).json({message:"not found"})
})

app.use("/api",isUserLogged,apiroutes);


let port = process.env.PORT || 3001

app.listen(port);

console.log("Running in port:"+port);