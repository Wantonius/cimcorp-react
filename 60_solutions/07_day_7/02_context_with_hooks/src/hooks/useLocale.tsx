import {useContext} from 'react';
import LocalContext from '../context/LocalContext';

const useLocale = () => {
	
	const locale = useContext(LocalContext);
	
	return locale;
}

export default useLocale;