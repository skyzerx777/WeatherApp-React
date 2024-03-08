import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Cards from './pages/Cards';
import CityWeather from './pages/CityWeather';
import NotFound from './pages/NotFound';
import SelectedCityType from './types/selectedCity';

export const CityContext = createContext({
	value: '',
	label: '',
});

function App() {
	const [selectedCity, setSelectedCity] = useState<SelectedCityType>({
		value: '',
		label: '',
	});

	return (
		<div className='flex justify-center flex-col items-center'>
			<SearchBar setSelectedCity={setSelectedCity} />
			<CityContext.Provider value={selectedCity}>
				<Routes>
					<Route
						path='/'
						element={<Cards setSelectedCity={setSelectedCity} />}
					/>
					<Route
						path='/:id'
						element={<CityWeather />}
						errorElement={<NotFound />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</CityContext.Provider>
		</div>
	);
}

export default App;
