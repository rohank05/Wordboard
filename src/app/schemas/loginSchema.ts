import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Invalid username")
        .required("Username is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 20 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Password is required"),
});
