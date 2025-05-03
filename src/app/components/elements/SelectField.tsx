import { Capitalize } from "@/app/constant/config";
import { CustomSelectProps } from "@/app/types/elements";
import { useEffect, useRef, useState } from "react";

export default function SelectField({
	options,
	value,
	onChange,
	placeholder,
	cls,
	required,
	error,
	label,
}: CustomSelectProps) {
	const [isOpen, setIsOpen] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
			<div ref={selectRef} className='relative min-w-[150px]'>
				{label && (
					<label className='text-base font-normal text-[#525252]'>
						{label} {required && <span className='text-red-500'>*</span>}
					</label>
				)}
				<button
					type='button'
					className={`${cls} min-w-[150px] appearance-none border-2 border-[#7F265B] text-[#7F265B] rounded-full pl-4 pr-4 py-2 focus:outline-none flex items-center justify-between cursor-pointer`}
					onClick={() => setIsOpen(!isOpen)}>
					{value ? Capitalize(value) : placeholder}
					<span className='ml-2'>&#9660;</span>
				</button>
				{isOpen && (
					<ul className='absolute left-0 right-0 mt-2 bg-white border-2 border-[#7F265B] rounded-xl shadow-lg z-50'>
						{options.map((option) => (
							<li
								key={option.value}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className='px-4 py-2 text-[#7F265B] cursor-pointer hover:bg-[#7F265B] hover:text-white transition-colors'>
								{option.label}
							</li>
						))}
					</ul>
				)}
				{required && <span className='text-red-500 text-xs'>{error}</span>}
			</div>
	);
}
