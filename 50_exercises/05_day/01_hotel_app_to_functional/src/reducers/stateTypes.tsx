import HotelInfo from '../models/HotelInfo';

export interface HotelState {
	loading:boolean;
	list:HotelInfo[];
	error:string;
}