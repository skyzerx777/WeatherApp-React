import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncPaginate } from 'react-select-async-paginate';
import { API_GEOCODING_URL } from '../constants';

function SearchBar({ setSelectedCity }) {
	const apiKey = import.meta.env.VITE_API_KEY;
	const [inputValue, setInputValue] = useState<string>('');
	const navigate = useNavigate();

	const getDataBySearch = async (inputValue: string) => {
		try {
			const response = await axios.get(
				`${API_GEOCODING_URL}/direct?q=${inputValue}&limit=5&appid=${apiKey}`
			);
			return {
				options: response.data.map(item => {
					return {
						value: `${item.lat} ${item.lon}`,
						label: `${item.name}, ${item.country}`,
					};
				}),
			};
		} catch (error) {
			console.log('Error:', error.message);
		}
	};

	const onChangeHandler = (inputValue: string) => {
		setInputValue(inputValue);
		setSelectedCity(inputValue);
		navigate(`/${inputValue.label}`);
		setInputValue('');
	};

	return (
		<div className='w-1/2 my-5 shadow-lg'>
			<AsyncPaginate
				loadOptions={getDataBySearch}
				value={inputValue}
				placeholder='Enter city'
				onChange={onChangeHandler}
				debounceTimeout={500}
				loadOptionsOnMenuOpen={false}
			/>
		</div>
	);
}

export default SearchBar;
