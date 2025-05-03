export interface User{
    username:string,
    password:string
}

export interface Options {
    label:string;
    value:string | number;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
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
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface CustomSelectProps {
    options: Options[];
    value: string | number;
    onChange: (val: string | number) => void;
    placeholder: string;
    cls?: string;
    required?:boolean;
    error?:string;
    label?:string;
}

export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}