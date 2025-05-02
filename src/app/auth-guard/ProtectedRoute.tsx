"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/app/store/store";

type Props = {
	children: React.ReactNode;
	allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
	const user = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/dashboard");
		} else if (!allowedRoles.includes(user.role)) {
			router.push("/unauthorized");
		}
	}, [user]);

	if (!user || !allowedRoles.includes(user.role)) return null;

	return <>{children}</>;
}
