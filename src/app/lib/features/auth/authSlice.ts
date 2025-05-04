import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/lib/store/store";

type User = {
	username: string;
	password: string;
	email: string;
	contact: number;
	address: string;
	role: string;
	id: string;
};

type AuthState = {
	user: User | null;
	users: User[];
};

const getInitialUser = (): User | null => {
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	}
	return null;
};

const initialState: AuthState = {
	user: getInitialUser(),
	users: [],
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<User>) {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logout(state) {
			state.user = null;
			localStorage.removeItem("user");
			localStorage.removeItem("tasks");
			window.location.href = "/";
		},
		setUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
		},
	},
});

export const { login, logout, setUsers } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUsers = (state: RootState) => state.auth.users;
