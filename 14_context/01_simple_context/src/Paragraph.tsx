import React,{useContext} from 'react';
import ThemeContext from './ThemeContext';

const Paragraph:React.FC<{}> = (props) => {
	
	const theme = useContext(ThemeContext);
	
	return(
		<p style={{
			color:theme.textcolor,
			backgroundColor:theme.background
		}}>{props.children}</p>
	)
}

export default Paragraph;