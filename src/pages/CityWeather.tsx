import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityContext } from '../App';
import HomePageButton from '../components/HomePageButton';
import { API_KEY, API_WEATHER_URL } from '../constants';
import FullCityInfoType from '../types/fullCityInfo';
import SelectedCityType from '../types/selectedCity';

function CityWeather() {
	const city: SelectedCityType = useContext(CityContext);
	const [selectedCity, setSelectedCity] = useState<SelectedCityType>();
	const [fullCityWeather, setFullCityWeather] = useState<FullCityInfoType>();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	const getData = async () => {
		if (selectedCity) {
			const [lat, lon] = selectedCity.value.split(' ');
			const response = await axios.get(
				`${API_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
			);
			const data = response.data;
			setFullCityWeather(data);
		}
	};

	useEffect(() => {
		getData();
	}, [selectedCity]);

	return (
		<div className='flex flex-col mt-[5%] bg-white rounded-lg p-10 shadow-lg w-2/5'>
			<div className='mb-4'>
				{!fullCityWeather || (!selectedCity && 'Loading...')}
				{selectedCity && fullCityWeather && (
					<div className='flex justify-between'>
						<h1 className='font-bold text-3xl mb-2'>{selectedCity.label}</h1>
						<img
							src={`http://openweathermap.org/img/w/${fullCityWeather.weather[0].icon}.png`}
						/>
					</div>
				)}
				{fullCityWeather && (
					<>
						<p className='mb-1'>Weather: {fullCityWeather.weather[0].main} </p>
						<p className='mb-1'>
							Temperature: {fullCityWeather.main.temp}&deg;C (Min:{' '}
							{fullCityWeather.main.temp_min}&deg;C, Max:{' '}
							{fullCityWeather.main.temp_max}&deg;C)
						</p>
						<p className='mb-1'>
							Atmospheric pressure: {fullCityWeather.main.pressure} hPa
						</p>
						<p className='mb-1'>Humidity: {fullCityWeather.main.humidity}%</p>
						<p className='mb-1'>
							Wind speed: {fullCityWeather.wind.speed} meter/sec
							{fullCityWeather.wind.gust
								? ` (Gusts up to: 
							${fullCityWeather.wind.gust} meter/sec)`
								: ''}
						</p>
						<p className='mb-1'>Cloudiness: {fullCityWeather.clouds.all}%</p>
					</>
				)}
			</div>
			<HomePageButton />
		</div>
	);
}

export default CityWeather;
