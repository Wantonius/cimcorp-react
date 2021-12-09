import React,{useContext} from 'react';
import ThemeContext from './ThemeContext';

interface Props {
	toggleTheme():void
}

const ToggleButton:React.FC<Props> = (props) => {
	
	const theme = useContext(ThemeContext);
	
	return(
		<button style={{
			color:theme.textcolor,
			backgroundColor:theme.background
		}} onClick={props.toggleTheme}>Toggle Theme</button>
	)
}

export default ToggleButton;