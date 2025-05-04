import {  put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import {
    LOGIN_REQUEST,
    loginSuccess,
    loginFailure,
} from './authActions';

function* handleLogin(action: any): Generator<any, void, any> {
    try {
        const { username, password } = action.payload;

        // Simulate login (replace with real API call)
        if (username === 'admin' && password === 'admin') {
            const user = { username, role: 'admin' };
            yield put(loginSuccess(user));
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error: any) {
        yield put(loginFailure(error.message));
    }
}

function* handleLogout(): Generator {
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    window.location.href = '/';
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest('auth/logout', handleLogout); 
}
