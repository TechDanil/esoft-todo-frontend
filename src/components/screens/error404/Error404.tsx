const Error404 = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-6xl font-bold text-gray-800'>404</h1>
			<h2 className='text-2xl font-semibold text-gray-600'>Page Not Found</h2>
			<p className='text-lg text-gray-600'>
				The page you are looking for does not exist.
			</p>
			<button
				onClick={() => window.history.back()}
				className='mt-4 px-6 py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
			>
				Go Back
			</button>
		</div>
	)
}

export default Error404
