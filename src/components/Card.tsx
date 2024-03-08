import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_GEOCODING_URL, API_KEY, API_WEATHER_URL } from '../constants';

function Card(props) {
	const { name, country_code: code, onClick } = props;
	const [temperatureInfo, setTemperatureInfo] = useState();
	const getCoordinates = async () => {
		const result = await axios.get(
			`${API_GEOCODING_URL}/direct?q=${name},${code}&limit=1&appid=${API_KEY}`
		);
		return result.data[0];
	};

	const getWeather = async () => {
		const coordinates = await getCoordinates();
		const { lat, lon } = coordinates;
		const result = await axios.get(
			`${API_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
		);
		setTemperatureInfo(result.data.main);
	};
	useEffect(() => {
		getWeather();
	}, []);

	const renderTemp = () => {
		if (temperatureInfo) {
			const temperature = (
				<div className='w-full h-full'>
					<p>
						Current temperature: {Math.round(temperatureInfo['temp'])}&deg;C
					</p>
					<p>Feels like: {Math.round(temperatureInfo['feels_like'])}&deg;C</p>
					<p>Minimum: {Math.round(temperatureInfo['temp_min'])}&deg;C</p>
					<p>Maximum: {Math.round(temperatureInfo['temp_max'])}&deg;C</p>
				</div>
			);
			return temperature;
		}
	};

	return (
		<div
			className='card w-1/4 bg-slate-100 rounded-lg text-center shadow-md flex flex-col justify-center p-8 hover:scale-110 hover:cursor-pointer ease-linear duration-100'
			onClick={onClick}
		>
			<h2 className='font-bold text-xl'>
				{name}, {code}
			</h2>
			{renderTemp()}
		</div>
	);
}

export default Card;
