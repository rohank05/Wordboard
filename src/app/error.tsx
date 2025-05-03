"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Error boundary caught:", error);
	}, [error]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center p-4'>
			<h2 className='text-2xl font-semibold text-red-600'>
				Something went wrong!
			</h2>
			<p className='mt-2 text-gray-700'>{error.message}</p>
			<button
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
				onClick={() => reset()}>
				Try Again
			</button>
		</div>
	);
}
