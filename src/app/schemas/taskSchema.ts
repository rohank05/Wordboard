import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    assignee: Yup.string().required("Assignee is required"),
    status: Yup.string().required("Status is required"),
    dueDate: Yup.string().required("Due date is required"),
});