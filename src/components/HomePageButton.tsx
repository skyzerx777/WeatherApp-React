import { Link } from 'react-router-dom';

export default function HomePageButton() {
	return (
		<>
			<Link to='/'>
				<button className='border-2 border-black rounded px-2 text-xl leading-9 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors duration-200'>
					Home page
				</button>
			</Link>
		</>
	);
}
