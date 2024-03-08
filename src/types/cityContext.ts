type CityContextType = {
	selectedCity: {
		label: string;
		value: string;
	} | null;
	setSelectedCity: () => void;
};

export default CityContextType;
