import { Capitalize } from "@/app/constant/config";
type TableProps = {
	user?: { username: string; role: string };
	data: Task[];
	handleEdit: (task: Task) => void;
	handleDelete: (task: Task) => void;
};

const Table = ({ data, handleEdit,handleDelete,user }: TableProps) => {
	return (
		<div className='overflow-x-scroll'>
			<table className='min-w-full  '>
				<thead>
					<tr className=' text-left'>
						<th className='px-4 py-2 rounded-tl-2xl bg-[#7F265B] text-white'>
							Title
						</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white'>Description</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white'>Status</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white'>Assignee</th>
						<th className='px-4 py-2  bg-[#7F265B] text-white'>Due Date</th>
						<th className='px-4 py-2 rounded-tr-2xl bg-[#7F265B] text-white'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((task: Task) => (
						<tr key={task.id} className='hover:bg-gray-100 even:bg-gray-50'>
							<td className=' px-4 py-2 font-medium'>
								{Capitalize(task.title)}
							</td>
							<td className=' px-4 py-2 text-medium'>
								{Capitalize(task.description) || "No description provided."}
							</td>
							<td className=' px-4 py-2'>{Capitalize(task.status)}</td>
							<td className=' px-4 py-2'>{Capitalize(task.assignee)}</td>
							<td className=' px-4 py-2'>{task.dueDate}</td>
							<td className=' px-4 py-2'>
								<button
									className='mr-2 cursor-pointer'
									onClick={() => handleEdit(task)}>
									<img
										src='/assets/pencil.svg'
										alt='Edit'
										className='w-5 h-5 inline-block'
									/>
								</button>
								{user?.role == "admin" && (
									<button
										className='cursor-pointer'
										onClick={() => handleDelete(task)}>
										<img
											src='/assets/trash.svg'
											alt='Delete'
											className='w-5 h-5 inline-block'
										/>
									</button>
								)}
							</td>
						</tr>
					))}
					{data.length === 0 && (
						<tr>
							<td colSpan={6} className='text-center py-4 text-gray-500'>
								No tasks found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
