import { InputFieldType } from "@/app/types/elements";
import Image from "next/image";
import React, { useState } from "react";

const PasswordToggle = (
	WrappedComponent: React.ComponentType<InputFieldType>
) => {
	return (props: InputFieldType) => {
		const [isHidden, setIsHidden] = useState(true);

		const handleToggle = () => {
			setIsHidden(!isHidden);
		};

		return (
			<div style={{ position: "relative" }}>
				<WrappedComponent {...props} type={isHidden ? "password" : "text"} />
				<Image
					src={isHidden ? "/assets/unlock.svg" : "/assets/lock.svg"}
					alt='toggle'
					width={20}
					height={20}
					onClick={handleToggle}
					className='absolute right-3 top-12.5 -translate-y-1/2 bg-transparent cursor-pointer'
				/>
			</div>
		);
	};
};

export default PasswordToggle;
