import { Task } from "@/app/types/tasks";

export interface Options {
	label: string;
	value: string | number;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	rowPerPage:number|string;
	totalItems:number;
	onPageChange: (page: number) => void;
	handleRowChange: (page: number|string) => void;
}

export interface InputFieldType {
	label?: string;
	required?: boolean;
	cls?: string;
	type?: string;
	name: string;
	value: string;
	placeholder: string;
	error?: string;
	touched?: boolean;
	max?:number;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleBlur: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

export interface CustomSelectProps {
	options: Options[];
	value: string | number;
	onChange: (val: string | number) => void;
	placeholder?: string;
	cls?: string;
	required?: boolean;
	error?: string;
	label?: string;
}

export interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
}

export interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (value: Task) => void;
	heading: string;
	modalType: string;
	task?: Task;
}
