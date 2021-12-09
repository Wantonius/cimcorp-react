import React,{useState} from 'react';
import ThemeContext,{themes,ThemeType} from './ThemeContext';

interface State {
	theme:ThemeType
}

const ThemeProvider:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return(
		<ThemeContext.Provider value={{
			...state.theme,
			toggleTheme:toggleTheme
		}}>
		{props.children}
		</ThemeContext.Provider>
	) 
}

export default ThemeProvider;