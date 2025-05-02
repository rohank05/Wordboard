export default function DeleteModal({
	isOpen,
	onClose,
	onConfirm,
	message,
}: ConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='fixed inset-0 bg-black opacity-50'
				onClick={onClose}></div>
			<div className='bg-white p-6 rounded-lg shadow-md z-50 max-w-sm w-full'>
				<p className='text-lg font-medium text-gray-800'>{message}</p>
				<div className='flex justify-end gap-4 mt-6'>
					<button
						onClick={onClose}
						className='px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100'>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700'>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
