import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { API_GEOCODING_URL, API_KEY } from '../constants';

function Cards({ setSelectedCity }) {
	const navigate = useNavigate();
	const cities = [
		{
			name: 'Odesa',
			country_code: 'UA',
		},
		{
			name: 'Kyiv',
			country_code: 'UA',
		},
		{
			name: 'London',
			country_code: 'GB',
		},
		{
			name: 'Manchester',
			country_code: 'GB',
		},
		{
			name: 'New York',
			country_code: 'US',
		},
		{
			name: 'Washington D.C.',
			country_code: 'US',
		},
		{
			name: 'Tokyo',
			country_code: 'JP',
		},
		{
			name: 'Rome',
			country_code: 'IT',
		},
		{
			name: 'Miami',
			country_code: 'US',
		},
	];

	const handleClick = async (event: MouseEvent) => {
		const city = event.target.closest('.card').firstChild.innerText;
		if (city) {
			const [cityName, code] = city.split(', ');
			const getCoordinates = async () => {
				const result = await axios.get(
					`${API_GEOCODING_URL}/direct?q=${cityName},${code}&limit=1&appid=${API_KEY}`
				);
				return result.data[0];
			};
			const coordinates = await getCoordinates();
			const { lat, lon } = coordinates;

			setSelectedCity({
				value: `${lat} ${lon}`,
				label: city,
			});
			navigate(`/${city}`);
		}
	};

	return (
		<div
			className='flex justify-around flex-wrap flex-shrink w-4/5 gap-x-1 gap-y-5'
			onClick={handleClick}
		>
			{cities.map((item, index) => (
				<Card key={index} name={item.name} country_code={item.country_code} />
			))}
		</div>
	);
}

export default Cards;
