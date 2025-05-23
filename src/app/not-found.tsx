export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center p-4'>
			<h1 className='text-4xl font-bold text-red-600'>404 - Page Not Found</h1>
			<p className='text-gray-700 mt-2'>
				Sorry the page youre looking for does not exist.
			</p>
		</div>
	);
}
