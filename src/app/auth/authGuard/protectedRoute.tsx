"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/app/lib/store/store";
import { AuthGuardType } from "@/app/types/auth";


const ProtectedRoute = ({ children, allowedRoles }: AuthGuardType) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/");
		} else if (!allowedRoles.includes(user.role)) {
			router.replace("/unauthorized");
		}
	}, [user]);

	if (!user || !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute