"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik } from "formik";
import * as Yup from "yup";

import { login, logout } from "@/app/features/auth/authSlice";
import { RootState } from "@/app/store/store";

import { users } from "../../../../public/mock-data/users";
import InputField from "../elements/InputField";
import { User } from "@/app/types/elements";


const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "Invalid username")
		.required("Username is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});
export default function LoginForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
		if (user) {
			dispatch(logout());
		}
	}, []);

	const handleLogin = (values:User) => {
		const user = users.find(
			(u) =>
				u.username === values.username && u.password === values.password
		);
		if (user) {
			dispatch(login({ username: user.username, role: user.role }));
			router.push("/dashboard");
		} else {
			alert("Invalid credentials");
		}
	};
	return (
		<>
			<section className='w-full h-screen flex'>
				{/* left section */}
				<div className='w-[60%] h-full xl:flex hidden'>
					<div className="w-full h-full bg-[url('/assets/login-bg.jpeg')] bg-cover bg-center"></div>
				</div>
				{/* right section */}
				<div className='xl:w-[40%] w-full bg-white flex items-center justify-center overflow-y-scroll'>
					<div className='sm:w-[70%] w-[90%] flex flex-col items-start'>
						<Image src={"/assets/logo.svg"} width={60} height={60} alt='logo' />
						<p className='mt-3 sm:text-[32px] text-[24px] font-bold text-[#525252]'>
							Login to your Account
						</p>
						<p className='mt-1 text-base font-normal text-[#525252]'>
							See what is going on with your Workboard
						</p>
						<Formik
							initialValues={{ username: "", password: "" }}
							validationSchema={LoginSchema}
							onSubmit={(values) => {
								handleLogin(values);
							}}>
							{({
								values,
								handleSubmit,
								handleChange,
								handleBlur,
								errors,
								touched,
							}) => (
								<form onSubmit={handleSubmit} className='w-full'>
									<InputField
										label='username'
										type={"username"}
										name={"username"}
										value={values.username}
										placeholder={"Enter your username"}
										handleChange={handleChange}
										handleBlur={handleBlur}
										error={errors.username}
										touched={touched.username}
										required
										cls='mt-12'
									/>
									<InputField
										label='Password'
										type={"password"}
										name={"password"}
										value={values.password}
										placeholder={"Enter your password"}
										handleChange={handleChange}
										handleBlur={handleBlur}
										error={errors.password}
										touched={touched.password}
										required
										cls='mt-4'
									/>
									<button className='mt-12 w-full rounded-md bg-[#7F265B] h-[50px] flex items-center justify-center text-white font-extrabold cursor-pointer'>
										Login
									</button>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</section>
		</>
	);
}
