import { AppDispatch } from "@/app/lib/store/store";
import { setUsers } from "./authSlice";

export const LOGIN_REQUEST = "auth/loginRequest";
export const LOGIN_SUCCESS = "auth/loginSuccess";
export const LOGIN_FAILURE = "auth/loginFailure";

export const loginRequest = (payload: {
	username: string;
	password: string;
}) => ({
	type: LOGIN_REQUEST,
	payload,
});

export const loginSuccess = (user: { username: string; role: string }) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});

export const loginFailure = (error: string) => ({
	type: LOGIN_FAILURE,
	payload: error,
});

export const fetchUsers = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetch(
			"https://6816f55d26a599ae7c38f59c.mockapi.io/workboard/username"
		);
		const data = await response.json();
		dispatch(setUsers(data));
	} catch (error) {
		console.error("Failed to fetch users:", error);
	}
};
