import { PaginationProps } from "@/app/types/elements";
import SelectField from "../elements/selectField";
import { Rows } from "@/app/constant/config";

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	rowPerPage,
	totalItems,
	onPageChange,
	handleRowChange,
}) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const lastPage = pages.length;

	const start = totalItems === 0 ? 0 : (currentPage - 1) * Number(rowPerPage) + 1;
	const end = Math.min(currentPage * Number(rowPerPage), totalItems);

	const isNavigationDisabled = totalItems <= Number(rowPerPage);

	console.log(totalPages);
	

	return (
		<div className='flex justify-between mt-4 flex-wrap gap-4'>
			<div className='flex items-center'>
				<p className='mr-2'>Rows per page:</p>
				<SelectField
					options={Rows}
					value={rowPerPage}
					onChange={handleRowChange}
				/>
			</div>

			<div className='flex gap-2 justify-end items-center flex-wrap'>
				<p className='text-sm text-gray-700'>
					Showing {start} - {end} of {totalItems}
				</p>

				<button
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1 || isNavigationDisabled}
					className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
					First Page
				</button>

				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1 || isNavigationDisabled}
					className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
					Prev
				</button>

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages || isNavigationDisabled}
					className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
					Next
				</button>

				<button
					onClick={() => onPageChange(lastPage)}
					disabled={currentPage === totalPages || isNavigationDisabled}
					className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer'>
					Last Page
				</button>
			</div>
		</div>
	);
};

export default Pagination;
