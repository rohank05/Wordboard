
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className='flex gap-2 mt-4 justify-end items-center'>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
				Prev
			</button>
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-1 rounded cursor-pointer ${
						currentPage === page ? "bg-[#7F265B] text-white" : "bg-gray-100"
					}`}>
					{page}
				</button>
			))}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
				Next
			</button>
		</div>
	);
};

export default Pagination;
