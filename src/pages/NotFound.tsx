import HomePageButton from '../components/HomePageButton';

function NotFound() {
	return (
		<div className='flex flex-col justify-center items-center mt-[5%] bg-white p-10 rounded-lg shadow-lg'>
			<p className='text-red-800 font-bold text-5xl mb-4'>Page not found</p>
			<HomePageButton />
		</div>
	);
}

export default NotFound;
