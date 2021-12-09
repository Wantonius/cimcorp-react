import React from 'react';

export const themes = {
	light: {
		textcolor:"#000000",
		background:"#d3d3d3"
	},
	dark: {
		textcolor:"#ffffff",
		background:"#595959"
	}
}

export interface ThemeType {
	textcolor:string,
	background:string
}

const ThemeContext = React.createContext<ThemeType>(themes.dark);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;