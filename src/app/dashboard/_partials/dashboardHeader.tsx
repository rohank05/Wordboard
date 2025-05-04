import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { logout, selectUser } from "@/app/lib/features/auth/authSlice";
import { Capitalize } from "@/app/constant/config";

const DashboardHeader = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className='bg-gray-100 px-6 py-4 rounded-3xl m-4 flex items-center'>
			<div className='w-[60%] h-full flex items-center'>
				<Image src={"/assets/logo.svg"} width={30} height={30} alt='logo' />
				<p className='pl-2 text-[20px] font-bold'>Workboard</p>
			</div>
			<div className='w-[40%] h-full flex items-center justify-end relative'>
				<div
					className='bg-[#7F265B] text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'
					onClick={() => setShowDropdown(!showDropdown)}>
					{user ? Capitalize(user.username.slice(0, 1)) : "U"}
				</div>

				{showDropdown && (
					<>
						<div
							className='fixed inset-0 bg-black opacity-0'
							onClick={() => setShowDropdown(false)}></div>
						<div className='absolute top-[52px] right-0 bg-white p-3 min-w-[100px] rounded-xl shadow-md'>
							<div
								className='flex items-center justify-between cursor-pointer'
								onClick={() => dispatch(logout())}>
								<p className='pr-4 text-[#525252] font-medium'>Logout</p>
								<Image
									src='/assets/logout.svg'
									alt='logout'
									width={25}
									height={25}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DashboardHeader;
