import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityContext } from '../App';
import HomePageButton from '../components/HomePageButton';
import SelectedCityType from '../types/selectedCity';

function CityWeather() {
	const city: SelectedCityType = useContext(CityContext);
	const [selectedCity, setSelectedCity] = useState<SelectedCityType>();
	const navigate = useNavigate();

	useEffect(() => {
		if (city.value === '' && !localStorage.getItem('selectedCity')) {
			navigate('*');
		}
		if (city.value != '') {
			localStorage.setItem('selectedCity', JSON.stringify(city));
			setSelectedCity(city);
		} else if (localStorage.getItem('selectedCity')) {
			setSelectedCity(JSON.parse(localStorage.getItem('selectedCity')));
		}
		return () => {
			localStorage.removeItem('selectedCity');
		};
	}, [city]);

	return (
		<>
			{!selectedCity && 'Loading...'}
			{selectedCity && selectedCity.value}
			<HomePageButton />
		</>
	);
}

export default CityWeather;
