"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectTasks,
	setTasks,
	addTask,
	editTask,
	deleteTask,
} from "../features/tasks/taskSlice";
import Table from "../components/custom/Table";
import SelectField from "../components/elements/SelectField";
import { ASSIGNEE, Capitalize, STATUS } from "../constant/config";
import Pagination from "../components/custom/Paginaton";
import { selectUser } from "../features/auth/authSlice";
import TaskModal from "../components/modals/TaskModal";
import DeleteModal from "../components/modals/DeleteModal";
import { log } from "console";
import { toast, ToastContainer } from "react-toastify";

export default function Dashboard() {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const user = useSelector(selectUser);

	const role = user.role;
	const username = user.username;

	const [view, setView] = useState<"table" | "charts">("table");
	const [statusFilter, setStatusFilter] = useState<string | number>("");
	const [assigneeFilter, setAssigneeFilter] = useState<string | number>("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
		const fetchTasks = async () => {
			const tasksFromStorage = localStorage.getItem("tasks");
			const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];

			if (tasks.length > 0) {
				dispatch(setTasks({ tasks, role, username }));
			} else {
				try {
					const res = await fetch("/mock-data/tasks.json");
					const tasksFromApi = await res.json();
					dispatch(setTasks({ tasks: tasksFromApi, role, username }));
					localStorage.setItem("tasks", JSON.stringify(tasksFromApi));
				} catch (err) {
					console.error("Error loading task data:", err);
				}
			}
		};

		fetchTasks();
	}, [dispatch, role, username]);


	const filteredTasks = useMemo(() => {
		return tasks.filter((task: any) => {
			return (
				(!statusFilter || task.status === statusFilter) &&
				(!assigneeFilter || task.assignee === assigneeFilter)
			);
		});
	}, [tasks, statusFilter, assigneeFilter]);

	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 3;

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

	const totalPages = useMemo(
		() => Math.ceil(filteredTasks.length / tasksPerPage),
		[filteredTasks]
	);

	const handleStatusFilterChange = useCallback((val: string | number) => {
		setStatusFilter(val);
		setCurrentPage(1);
	}, []);

	const handleAssigneeFilterChange = useCallback((val: string | number) => {
		setAssigneeFilter(val);
		setCurrentPage(1);
	}, []);

	const handleAddSubmit = (values: Task) => {
		dispatch(addTask(values));
		setIsAddModalOpen(false);
		toast.success("Task Added Successfully");
	};

	const handleEditSubmit = (values: Task) => {
		dispatch(editTask(values));
		setIsEditModalOpen(false);
		toast.success("Task Updated Successfully");
	};

	const handleDelete = () => {
		dispatch(deleteTask(selectedTask?.id));
		setIsDeleteModalOpen(false);
		setCurrentPage(1);
		toast.warn("Task Deleted Successfully");
	};

	return (
		<>
			<div className='bg-gray-100 px-6 py-4 rounded-3xl m-4 flex items-center'>
				{/* left section */}
				<div className='w-[60%] h-full flex items-center'>
					<Image src={"/assets/logo.svg"} width={30} height={30} alt='logo' />
					<p className='pl-2 text-[20px] font-bold'>Workboard</p>
				</div>
				{/* right section */}
				<div className='w-[40%] h-full flex items-center justify-end'>
					<div className='bg-[#7F265B] text-white w-10 h-10 rounded-full flex items-center justify-center'>
						{/* {user ? Capitalize(user.username.slice(0, 1)) : "U"} */} U
					</div>
					<div className='ml-2 font-medium'>
						{/* {user ? Capitalize(user.username) : "User"} */} User
					</div>
				</div>
			</div>
			<div className='bg-gray-100 px-6 py-4 rounded-3xl m-4'>
				<div className='w-full xl:flex items-center'>
					<div className='flex-col xl:w-[70%] w-full'>
						<h1 className='text-[32px] font-medium'>Dashboard</h1>
						<p className='text-base font-normal text-[#525252]'>
							Better management through task organisation
						</p>
					</div>
					<div className='xl:w-[30%] w-full flex items-center justify-end mt-8 xl:mt-0'>
						{user.role == "admin" && (
							<button
								className='bg-[#7F265B] text-white rounded-4xl px-4 py-2 cursor-pointer'
								onClick={() => setIsAddModalOpen(true)}>
								<span className='mr-2'>+</span> Add Task
							</button>
						)}
						<div className='flex items-center bg-white rounded-full p-1 w-fit ml-4'>
							<button
								onClick={() => setView("table")}
								className={`px-4 py-2 shadow rounded-l-full text-sm font-medium transition cursor-pointer 
          ${view === "table" ? "bg-gray-100  text-black" : "text-gray-600"}`}>
								Table
							</button>
							<button
								onClick={() => setView("charts")}
								className={`px-4 py-2 shadow rounded-r-full text-sm font-medium transition cursor-pointer
          ${view === "charts" ? "bg-gray-100  text-black" : "text-gray-600"}`}>
								Charts
							</button>
						</div>
					</div>
				</div>
				<div className='mt-10 bg-white p-6 rounded-2xl'>
					<div className='flex items-center mb-4'>
						<div className='sm:mr-4'>
							<SelectField
								options={STATUS}
								value={statusFilter}
								onChange={handleStatusFilterChange}
								placeholder='Select Status'
							/>
						</div>
						{user.role == "admin" && (
							<div>
								<SelectField
									options={ASSIGNEE}
									value={assigneeFilter}
									onChange={handleAssigneeFilterChange}
									placeholder='Select Assignee'
								/>
							</div>
						)}
						<div className='ml-8'>
							<button
								className='text-white bg-[#7F265B] rounded-full px-6 py-2 focus:outline-none cursor-pointer'
								onClick={() => {
									setAssigneeFilter("");
									setStatusFilter("");
									setCurrentPage(1);
								}}>
								Clear
							</button>
						</div>
					</div>
					{view == "table" ? (
						<div className='mt-6'>
							<Table
								user={user}
								data={currentTasks}
								handleEdit={(task) => {
									setIsEditModalOpen(true);
									setSelectedTask(task);
								}}
								handleDelete={(task) => {
									setIsDeleteModalOpen(true);
									setSelectedTask(task);
								}}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						</div>
					) : (
						"chaart"
					)}
				</div>
			</div>
			<TaskModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSubmit={(values) => handleAddSubmit(values)}
				heading={"Add Task"}
				modalType={"add"}
			/>
			<TaskModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onSubmit={(values) => handleEditSubmit(values)}
				heading={"Edit Task"}
				modalType={"edit"}
				task={selectedTask}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDelete}
				message={"Are you sure you want to delete this task?"}
			/>
			<ToastContainer />
		</>
	);
}
