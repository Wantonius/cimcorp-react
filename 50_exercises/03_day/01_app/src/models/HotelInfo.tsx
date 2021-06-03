export default class HotelInfo {

	id:number = 0;
	name:string = "";
	address:string = "";
	city:string = "";
	country:string = "";
	comment:string = "";
	
	constructor(id:number,name:string,address:string,city:string,country:string,comment:string) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
		this.country = country;
		this.comment = comment;
	}
	
}