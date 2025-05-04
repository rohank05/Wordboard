"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import {
	selectTasks,
	setTasks,
	addTask,
	editTask,
	deleteTask,
} from "@/app/lib/features/tasks/taskSlice";
import { selectUser } from "@/app/lib/features/auth/authSlice";
import {
	startLoading,
	stopLoading,
} from "@/app/lib/features/loader/loaderSlice";

import { Task } from "@/app/types/tasks";
import { ASSIGNEE, STATUS } from "../../constant/config";

import Table from "@/app/dashboard/_partials/table";
import TaskCharts from "@/app/dashboard/_partials/chart";

import SelectField from "@/app/components/elements/selectField";
import Pagination from "@/app/components/custom/paginaton";
import TaskModal from "@/app/components/modals/taskModal";
import DeleteModal from "@/app/components/modals/deleteModal";
import DashboardHeader from "./dashboardHeader";

export default function Dashboard() {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const user = useSelector(selectUser);
	const role = user?.role;
	const username = user?.username;

	const [view, setView] = useState<"table" | "charts">("table");
	const [statusFilter, setStatusFilter] = useState<string | number>("");
	const [assigneeFilter, setAssigneeFilter] = useState<string | number>("");
	const [modalType, setModalType] = useState<"add" | "edit">("add");
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task>();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState<number|string>(5);

	const indexOfLastTask = currentPage * Number(rowPerPage);
	const indexOfFirstTask = indexOfLastTask - Number(rowPerPage);
	

	useEffect(() => {
		const fetchTasks = async () => {
			dispatch(startLoading());
			const tasksFromStorage = localStorage.getItem("tasks");
			const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];

			if (tasks.length > 0) {
				dispatch(setTasks({ tasks, role, username }));
				dispatch(stopLoading());
			} else {
				try {
					const res = await fetch("/mock-data/tasks.json");
					const tasksFromApi = await res.json();
					dispatch(setTasks({ tasks: tasksFromApi, role, username }));
					localStorage.setItem("tasks", JSON.stringify(tasksFromApi));
				} catch (err) {
					console.error("Error loading task data:", err);
				} finally {
					dispatch(stopLoading());
				}
			}
		};

		fetchTasks();
	}, [dispatch, role, username]);

	const filteredTasks = useMemo(() => {
		return tasks
			.filter((task: Task) => {
				return (
					(!statusFilter || task.status === statusFilter) &&
					(!assigneeFilter || task.assignee === assigneeFilter)
				);
			})
			.slice()
			.reverse();
	}, [tasks, statusFilter, assigneeFilter]);

	const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

	const totalPages = useMemo(() => Math.ceil(filteredTasks.length / Number(rowPerPage)),[filteredTasks,rowPerPage]);

	const handleRowChange = (val: string | number) => {
		setRowPerPage(val);
	};

	const handleStatusFilterChange = useCallback((val: string | number) => {
		setStatusFilter(val);
		setCurrentPage(1);
	}, []);

	const handleAssigneeFilterChange = useCallback((val: string | number) => {
		setAssigneeFilter(val);
		setCurrentPage(1);
	}, []);

	const openAddModal = () => {
		setModalType("add");
		setSelectedTask(undefined);
		setIsTaskModalOpen(true);
	};

	const openEditModal = (task: Task) => {
		setModalType("edit");
		setSelectedTask(task);
		setIsTaskModalOpen(true);
	};

	const handleTaskSubmit = (values: Task) => {
		if (modalType === "add") {
			dispatch(addTask(values));
			toast.success("Task Added Successfully");
		} else {
			dispatch(editTask(values));
			toast.success("Task Updated Successfully");
		}
		setIsTaskModalOpen(false);
	};

	const handleDelete = () => {
		dispatch(deleteTask(selectedTask?.id));
		setIsDeleteModalOpen(false);
		setCurrentPage(1);
		toast.warn("Task Deleted Successfully");
	};

	return (
		<>
			<DashboardHeader />
			<div className='bg-gray-100 px-6 py-4 rounded-3xl m-4'>
				<div className='w-full xl:flex items-center'>
					<div className='flex-col xl:w-[70%] w-full'>
						<h1 className='text-[32px] font-medium'>Dashboard</h1>
						<p className='text-base font-normal text-[#525252]'>
							Better management through task organisation
						</p>
					</div>
					<div className='xl:w-[30%] w-full sm:flex items-center justify-end mt-8 xl:mt-0'>
						{user && user.role == "admin" && (
							<button
								className='bg-[#7F265B] text-white rounded-4xl px-4 py-2 cursor-pointer sm:w-auto w-full'
								onClick={openAddModal}>
								<span className='mr-2'>+</span> Add Task
							</button>
						)}
						<div className='flex items-center bg-white rounded-full p-1 w-fit sm:ml-4 mt-2 sm:w-auto w-full'>
							<button
								onClick={() => setView("table")}
								className={`px-4 py-2 shadow rounded-l-full text-sm font-medium transition cursor-pointer 
          ${
						view === "table" ? "bg-gray-100  text-black" : "text-gray-600"
					} sm:w-auto w-full`}>
								Table
							</button>
							<button
								onClick={() => setView("charts")}
								className={`px-4 py-2 shadow rounded-r-full text-sm font-medium transition cursor-pointer
          ${
						view === "charts" ? "bg-gray-100  text-black" : "text-gray-600"
					} sm:w-auto w-full`}>
								Charts
							</button>
						</div>
					</div>
				</div>
				<div className='mt-10 bg-white p-6 rounded-2xl'>
					<div className='sm:flex items-center mb-4'>
						<div className='sm:mr-4'>
							<SelectField
								options={STATUS}
								value={statusFilter}
								onChange={handleStatusFilterChange}
								placeholder='Select Status'
								cls='sm:w-auto w-full'
							/>
						</div>
						{user && user.role == "admin" && (
							<div className='sm:mt-0 mt-2'>
								<SelectField
									options={ASSIGNEE}
									value={assigneeFilter}
									onChange={handleAssigneeFilterChange}
									placeholder='Select Assignee'
									cls='sm:w-auto w-full'
								/>
							</div>
						)}
						<div className='sm:ml-8 sm:mt-0 mt-2'>
							<button
								className='text-white bg-[#7F265B] rounded-full px-6 py-2 focus:outline-none cursor-pointer sm:w-auto w-full'
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
								user={user ? user : { username: "", role: "" }}
								data={currentTasks}
								handleEdit={(task) => openEditModal(task)}
								handleDelete={(task) => {
									setIsDeleteModalOpen(true);
									setSelectedTask(task);
								}}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								rowPerPage={rowPerPage}
								onPageChange={setCurrentPage}
								handleRowChange={handleRowChange}
								totalItems={filteredTasks.length}
							/>
						</div>
					) : (
						<TaskCharts data={filteredTasks} />
					)}
				</div>
			</div>

			<TaskModal
				isOpen={isTaskModalOpen}
				onClose={() => setIsTaskModalOpen(false)}
				onSubmit={handleTaskSubmit}
				heading={modalType === "add" ? "Add Task" : "Edit Task"}
				modalType={modalType}
				task={modalType === "edit" ? selectedTask : undefined}
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
