import { InputFieldType } from "@/app/types/elements";

const InputField = ({
	label,
	required,
	cls,
	type,
	name,
	value,
	placeholder,
	error,
	touched,
	handleChange,
	handleBlur,
	max,
	...props
}: InputFieldType) => {
	const hasError = touched && error;

	return (
		<div className={`flex flex-col space-y-1 w-full ${cls}`}>
			{label && (
				<label className='text-base font-normal text-[#525252]'>
					{label} {required && <span className='text-red-500'>*</span>}
				</label>
			)}
			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				max={max}
				className={`focus:outline-none w-full border rounded-md h-[45px] border-[#DED2D9] text-black px-[10px] placeholder: text error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"`}
				{...props}
			/>
			{hasError && <p className={`text-red-500 text-xs1 ${type == 'password' ? 'min-h-[20px]' : ''}`}>{error}</p>}
		</div>
	);
};

export default InputField;
