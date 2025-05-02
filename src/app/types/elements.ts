interface Options {
    label:string;
    value:string | number;
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}


interface InputFieldType {
    label?: string;
    required?: boolean;
    cls?: string;
    type?: string;
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    touched?: boolean;
    handleChange: any;
    handleBlur: any;
}

interface CustomSelectProps {
    options: Options[];
    value: string | number;
    onChange: (val: string | number) => void;
    placeholder: string;
    cls?: string;
    required?:boolean;
    error?:string;
}

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}