import { createContext } from 'react';
import CityContextType from '../types/cityContext';

export const CityContext = createContext<CityContextType>({
	selectedCity: null,
	setSelectedCity: () => {},
});
