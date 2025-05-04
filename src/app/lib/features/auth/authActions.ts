export const LOGIN_REQUEST = 'auth/loginRequest';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';

export const loginRequest = (payload: { username: string; password: string }) => ({
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
