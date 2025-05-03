// components/GlobalLoader.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const Loader = () => {
	const loading = useSelector((state: RootState) => state.loader.loading);

	if (!loading) return null;

	return (
		<div className='fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50'>
			<div className='h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
		</div>
	);
};

export default Loader;
