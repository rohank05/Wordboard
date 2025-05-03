import { Capitalize } from "@/app/constant/config";
import { Task } from "@/app/types/tasks";
type TableProps = {
	user?: { username: string; role: string };
	data: Task[];
	handleEdit: (task: Task) => void;
	handleDelete: (task: Task) => void;
};

const Table = ({ data, handleEdit, handleDelete, user }: TableProps) => {
	return (
		<div className='overflow-x-scroll'>
			<table className='min-w-full  '>
				<thead>
					<tr className=' text-left'>
						<th className='px-4 py-2 rounded-tl-2xl bg-[#7F265B] text-white  min-w-[350px]'>
							Title
						</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white min-w-[550px]'>
							Description
						</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white  min-w-[150px]'>
							Status
						</th>
						<th className='px-4 py-2 bg-[#7F265B] text-white min-w-[150px]'>
							Assignee
						</th>
						<th className='px-4 py-2  bg-[#7F265B] text-white min-w-[150px]'>
							Due Date
						</th>
						<th className='px-4 py-2 rounded-tr-2xl bg-[#7F265B] text-white min-w-[150px]'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((task: Task) => (
						<tr key={task.id} className='hover:bg-gray-100 even:bg-gray-50'>
							<td className=' px-4 py-2 font-medium  min-w-[350px]'>
								{Capitalize(task.title)}
							</td>
							<td className=' px-4 py-2 text-medium min-w-[550px]'>
								{Capitalize(task.description) || "No description provided."}
							</td>
							<td className={"px-4 py-2 min-w-[150px]"}>
								<p
									className={`${
										task.status === "pending"
											? "bg-[#C63C51]"
											: task.status === "in-progress"
											? "bg-[#FFA24C]"
											: task.status === "done"
											? "bg-[#86A788]"
											: ""
									} text-white py-2 px-4 rounded-3xl text-center w-[150px]`}>
									{Capitalize(task.status)}
								</p>
							</td>
							<td className=' px-4 py-2 min-w-[150px]'>
								{Capitalize(task.assignee)}
							</td>
							<td className=' px-4 py-2 min-w-[150px]'>{task.dueDate}</td>
							<td className=' px-4 py-2 min-w-[150px]'>
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
