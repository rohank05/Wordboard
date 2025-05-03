import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../elements/InputField";
import SelectField from "../elements/SelectField";
import { ASSIGNEE, STATUS } from "@/app/constant/config";
import TextAreaField from "../elements/TextAreaField";
import { Task } from "@/app/types/tasks";

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (value: Task) => void;
	heading: string;
	modalType: string;
	task?: Task;
}

const TaskSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string(),
	assignee: Yup.string().required("Assignee is required"),
	status: Yup.string().required("Status is required"),
	dueDate: Yup.string().required("Due date is required"),
});

export default function TaskModal({
	heading,
	isOpen,
	onClose,
	onSubmit,
	modalType,
	task,
}: TaskModalProps) {
	if (!isOpen) return null;

	const initialValues =
		modalType === "edit" && task
			? task
			: {
					title: "",
					description: "",
					assignee: "",
					status: "pending",
					dueDate: "",
			  };

	return (
		isOpen && (
			<div className='fixed inset-0 z-50 flex'>
				<div
					className='fixed inset-0 bg-black opacity-50'
					onClick={onClose}></div>
				<div className='ml-auto h-full w-full max-w-md bg-white shadow-xl z-50 p-6 overflow-y-scroll'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-[24px] font-bold'>{heading}</h2>
						<button
							onClick={onClose}
							className='text-[#7F265B] font-semibold cursor-pointer'>
							<img src='/assets/close.svg' alt='close' width={20} height={20} />
						</button>
					</div>
					<div>
						<Formik
							initialValues={initialValues}
							validationSchema={TaskSchema}
							onSubmit={(values) => {
								console.log("Form Submitted:", values);
								onSubmit(values);
							}}>
							{({
								values,
								handleSubmit,
								handleChange,
								handleBlur,
								setFieldValue,
								errors,
								touched,
							}) => (
								<form onSubmit={handleSubmit} className='w-full'>
									<InputField
										label='Title'
										type={"text"}
										name={"title"}
										value={values.title}
										placeholder={"Enter Title"}
										handleChange={handleChange}
										handleBlur={handleBlur}
										error={errors.title}
										touched={touched.title}
										required
										cls='mt-8'
									/>
									<TextAreaField
										label='Description'
										name={"description"}
										value={values.description}
										placeholder={"Enter description"}
										handleChange={handleChange}
										handleBlur={handleBlur}
										error={errors.description}
										touched={touched.description}
										cls='mt-4'
									/>
									{modalType == "add" && (
										<div className='mt-4'>
											<SelectField
												options={ASSIGNEE}
												value={values.assignee}
												onChange={(val) => setFieldValue("assignee", val)}
												placeholder='Select Assignee'
												cls='w-full mt-1'
												required
												error={errors.assignee}
												label='Assignee'
											/>
										</div>
									)}
									{modalType == "edit" && (
										<div className='mt-4'>
											<SelectField
												options={STATUS}
												value={values.status}
												onChange={(val) => setFieldValue("status", val)}
												placeholder='Select Status'
												cls='w-full mt-1'
												required={modalType == "edit" ? true : false}
												error={errors.status}
												label='Status'
											/>
										</div>
									)}
									<InputField
										label='Due Date'
										type={"date"}
										name={"dueDate"}
										value={values.dueDate}
										placeholder={"Enter due date"}
										handleChange={handleChange}
										handleBlur={handleBlur}
										error={errors.dueDate}
										touched={touched.dueDate}
										required
										cls='mt-4'
									/>

									<div className='w-full flex items-center justify-between gap-4 mt-8'>
										<button
											type='button'
											className='w-full rounded-md border border-[#7F265B] h-[50px] flex items-center justify-center text-[#7F265B] font-extrabold cursor-pointer'
											onClick={onClose}>
											Cancel
										</button>
										<button
											type='submit'
											className='w-full rounded-md bg-[#7F265B] h-[50px] flex items-center justify-center text-white font-extrabold cursor-pointer'>
											Save
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		)
	);
}
