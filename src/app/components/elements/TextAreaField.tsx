

const TextAreaField = ({
	label,
	required,
	cls,
	name,
	value,
	placeholder,
	error,
	touched,
	handleChange,
	handleBlur,
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
			<textarea
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				rows={4}
				className='w-full border border-[#DED2D9] rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#7F265B] resize-none'
				{...props}
			/>
			{hasError && <span className='text-red-500 text-xs'>{error}</span>}
		</div>
	);
};

export default TextAreaField;
