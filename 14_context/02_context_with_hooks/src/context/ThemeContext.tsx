import React from 'react';

export const themes = {
	light:{
		color:"#000000",
		backgroundColor:"#d3d3d3"
	},
	dark:{
		color:"#ffffff",
		backgroundColor:"#595959"
	}
}

export interface ThemeType {
	color:string,
	backgroundColor:string
}

export interface ThemeFunction {
	toggleTheme():void
}

interface Theme extends ThemeType,ThemeFunction {}

const ThemeContext = React.createContext<Theme>({
	color:"",
	backgroundColor:"",
	toggleTheme:() => {}
})

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;